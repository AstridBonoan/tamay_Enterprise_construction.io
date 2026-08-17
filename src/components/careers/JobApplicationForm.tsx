"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { syncContactFromForm, fetchAddresses } from "@/lib/account-data";
import {
  FORMSPREE_JOB_APPLICATION,
  JOB_APPLICATION_STEPS,
  PRIMARY_INTEREST_OPTIONS,
  TRADE_ROLE_OPTIONS,
  emptyJobApplicationForm,
  validateJobApplication,
  validateJobApplicationStep,
  type JobApplicationFormData,
} from "@/lib/jobApplication";
import {
  jobApplicationSignatureReference,
  saveJobApplication,
  uploadJobApplicationSignature,
} from "@/lib/jobApplicationSubmission";
import "@/styles/job-application-form.css";

const SignatureCanvasField = dynamic(
  () =>
    import("@/components/careers/SignatureCanvasField").then((mod) => mod.SignatureCanvasField),
  {
    ssr: false,
    loading: () => <p className="tamay-note">Loading signature pad…</p>,
  },
);

export function JobApplicationForm() {
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<JobApplicationFormData>(() => emptyJobApplicationForm());
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!user) return;

    void (async () => {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      let defaultAddress: Awaited<ReturnType<typeof fetchAddresses>>[number] | undefined;

      try {
        const addresses = await fetchAddresses(user.id);
        defaultAddress = addresses.find((address) => address.is_default) ?? addresses[0];
      } catch {
        defaultAddress = undefined;
      }

      setData((prev) => ({
        ...prev,
        email: prev.email || user.email,
        full_name: prev.full_name || fullName,
        phone: prev.phone || user.phone || "",
        address_line1: prev.address_line1 || defaultAddress?.line1 || "",
        address_line2: prev.address_line2 || defaultAddress?.line2 || "",
        city: prev.city || defaultAddress?.city || "",
        state: prev.state || defaultAddress?.state || prev.state,
        zip: prev.zip || defaultAddress?.zip || "",
      }));
    })();
  }, [user]);

  const update = useCallback(
    <K extends keyof JobApplicationFormData>(key: K, value: JobApplicationFormData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setStatus("");
    },
    [],
  );

  const goNext = () => {
    const error = validateJobApplicationStep(step, data);
    if (error) {
      setStatus(error);
      return;
    }
    setStep((current) => Math.min(current + 1, JOB_APPLICATION_STEPS.length - 1));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const error = validateJobApplication(data);
    if (error) {
      setStatus(error);
      return;
    }

    setSubmitting(true);
    setStatus("");

    let applicationId: string;
    let signaturePath: string;

    try {
      signaturePath = await uploadJobApplicationSignature(data.signature_data_url);
      applicationId = await saveJobApplication(data, signaturePath, user?.id);
    } catch {
      setStatus("Unable to save your signature right now. Please try again.");
      setSubmitting(false);
      return;
    }

    const body = new FormData();
    body.append("form_name", "Tamay - Job Application");
    body.append("_subject", "New Job Application Submission - Tamay Enterprises Inc.");
    body.append("full_name", data.full_name);
    body.append("phone", data.phone);
    body.append("email", data.email);
    body.append("address_line1", data.address_line1);
    body.append("address_line2", data.address_line2);
    body.append("zip", data.zip);
    body.append("city", data.city);
    body.append("state", data.state);
    body.append("primary_interest", data.primary_interest);
    body.append("position", data.position);
    body.append("position_other", data.position_other);
    body.append("start_date", data.start_date);
    body.append("employment_type", data.employment_type);
    body.append("availability_details", data.availability_details);
    body.append("drivers_license", data.drivers_license);
    body.append("driving_issues", data.driving_issues);
    body.append("driving_issues_notes", data.driving_issues_notes);
    body.append("work_authorized", data.work_authorized);
    body.append("agree_background", data.agree_background);
    body.append("confirm_truth", data.confirm_truth ? "Yes" : "No");
    body.append("application_id", applicationId);
    body.append("signature_storage_path", jobApplicationSignatureReference(signaturePath));
    body.append("signature_date", data.signature_date);
    if (data.resume_file) {
      body.append("resume_file", data.resume_file);
    }

    try {
      const response = await fetch(FORMSPREE_JOB_APPLICATION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        if (user) {
          try {
            await syncContactFromForm(user.id, {
              phone: data.phone,
              fullName: data.full_name,
              line1: data.address_line1,
              line2: data.address_line2 || undefined,
              city: data.city,
              state: data.state,
              zip: data.zip,
              label: "Home",
            });
            await refreshUser();
          } catch {
            // Application still submitted; account sync can be retried later.
          }
        }

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const json = (await response.json().catch(() => ({}))) as {
          errors?: { message: string }[];
        };
        setStatus(
          json.errors?.map((e) => e.message).join(", ") ??
            "There was a problem submitting the application. Please try again.",
        );
      }
    } catch {
      setStatus("There was a problem submitting the application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="tamay-wrap">
        <div className="tamay-success">
          <h3>Application Submitted Successfully</h3>
          <p>
            Thank you for applying with Tamay Enterprises Inc.
            <br />
            Our team will review your application and contact you if we move forward with the hiring
            process.
          </p>
        </div>
      </div>
    );
  }

  const current = JOB_APPLICATION_STEPS[step];
  const isLastStep = step === JOB_APPLICATION_STEPS.length - 1;

  return (
    <div className="tamay-wrap">
      <div className="tamay-header">
        <h2>Job Application – Tamay Enterprises Inc.</h2>
        <p>
          Step {step + 1} of {JOB_APPLICATION_STEPS.length}. Fields marked with * are required.
        </p>
      </div>

      <nav className="tamay-progress" aria-label="Application steps">
        {JOB_APPLICATION_STEPS.map((item, index) => (
          <div
            key={item.id}
            className={`tamay-progress-step ${index === step ? "is-active" : ""} ${index < step ? "is-done" : ""}`}
          >
            {item.label}
          </div>
        ))}
      </nav>

      <div className="tamay-card">
        <div className="tamay-legend">{current.title}</div>

        {step === 0 && (
          <>
            <label>
              Full Name *
              <input
                type="text"
                required
                value={data.full_name}
                onChange={(e) => update("full_name", e.target.value)}
              />
            </label>

            <div className="tamay-grid">
              <div className="tamay-col">
                <label>
                  Phone *
                  <input
                    type="tel"
                    required
                    placeholder="(###) ###-####"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </label>
              </div>
              <div className="tamay-col">
                <label>
                  Email *
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </label>
              </div>
            </div>

            <label>
              Address *
              <input
                type="text"
                required
                placeholder="Street address"
                value={data.address_line1}
                onChange={(e) => update("address_line1", e.target.value)}
              />
            </label>

            <div className="tamay-grid">
              <div className="tamay-col">
                <label>
                  Apt / Suite (optional)
                  <input
                    type="text"
                    placeholder="Apt, suite, unit, etc."
                    value={data.address_line2}
                    onChange={(e) => update("address_line2", e.target.value)}
                  />
                </label>
              </div>
              <div className="tamay-col">
                <label>
                  Zip Code *
                  <input
                    type="text"
                    required
                    placeholder="#####"
                    value={data.zip}
                    onChange={(e) => update("zip", e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="tamay-grid">
              <div className="tamay-col">
                <label>
                  City *
                  <input
                    type="text"
                    required
                    value={data.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </label>
              </div>
              <div className="tamay-col">
                <label>
                  State *
                  <input
                    type="text"
                    required
                    value={data.state}
                    onChange={(e) => update("state", e.target.value)}
                  />
                </label>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <label>
              Primary Interest *
              <select
                required
                value={data.primary_interest}
                onChange={(e) => update("primary_interest", e.target.value)}
              >
                <option value="">Select one</option>
                {PRIMARY_INTEREST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Trade / Role Applying For *
              <select
                required
                value={data.position}
                onChange={(e) => update("position", e.target.value)}
              >
                <option value="">Select one</option>
                {TRADE_ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label>
              If &quot;Other&quot;, please specify
              <input
                type="text"
                value={data.position_other}
                onChange={(e) => update("position_other", e.target.value)}
              />
            </label>

            <div className="tamay-grid">
              <div className="tamay-col">
                <label>
                  Available Start Date *
                  <input
                    type="date"
                    required
                    value={data.start_date}
                    onChange={(e) => update("start_date", e.target.value)}
                  />
                </label>
              </div>
              <div className="tamay-col">
                <label>
                  Employment Type *
                  <select
                    required
                    value={data.employment_type}
                    onChange={(e) => update("employment_type", e.target.value)}
                  >
                    <option value="">Select one</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Temporary</option>
                    <option>On-call</option>
                  </select>
                </label>
              </div>
            </div>

            <label>
              Days / Hours Available *
              <textarea
                required
                rows={3}
                placeholder="Example: Mon–Fri 7am–4pm, weekends as needed"
                value={data.availability_details}
                onChange={(e) => update("availability_details", e.target.value)}
              />
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <label>
              Resume Upload (Recommended)
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => update("resume_file", e.target.files?.[0] ?? null)}
              />
            </label>

            <p className="tamay-note">
              Applicants who submit a resume will receive stronger consideration.
            </p>
            <p className="tamay-note">Accepted formats: PDF, DOC, DOCX.</p>
          </>
        )}

        {step === 3 && (
          <>
            <label>
              Valid Driver&apos;s License? *
              <select
                required
                value={data.drivers_license}
                onChange={(e) => update("drivers_license", e.target.value)}
              >
                <option value="">Select one</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>

            <label>
              Last 3 years: points / suspension / serious tickets? *
              <select
                required
                value={data.driving_issues}
                onChange={(e) => update("driving_issues", e.target.value)}
              >
                <option value="">Select one</option>
                <option>No</option>
                <option>Yes (explain)</option>
              </select>
            </label>

            <label>
              If Yes, brief explanation
              <input
                type="text"
                placeholder="Short explanation"
                value={data.driving_issues_notes}
                onChange={(e) => update("driving_issues_notes", e.target.value)}
              />
            </label>
          </>
        )}

        {step === 4 && (
          <>
            <label>
              Authorized to work in the U.S.? *
              <select
                required
                value={data.work_authorized}
                onChange={(e) => update("work_authorized", e.target.value)}
              >
                <option value="">Select one</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>

            <label>
              Agree to background check if required? *
              <select
                required
                value={data.agree_background}
                onChange={(e) => update("agree_background", e.target.value)}
              >
                <option value="">Select one</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
          </>
        )}

        {step === 5 && (
          <>
            <label className="tamay-check">
              <input
                type="checkbox"
                checked={data.confirm_truth}
                onChange={(e) => update("confirm_truth", e.target.checked)}
              />
              I confirm that the information provided is accurate and complete. *
            </label>

            <SignatureCanvasField
              value={data.signature_data_url}
              onChange={(dataUrl) => update("signature_data_url", dataUrl)}
            />

            <label>
              Date *
              <input
                type="date"
                required
                value={data.signature_date}
                onChange={(e) => update("signature_date", e.target.value)}
              />
            </label>

            <p className="tamay-note">
              By submitting this form, you agree that Tamay Enterprises Inc. may contact you regarding
              employment opportunities.
            </p>
          </>
        )}
      </div>

      <div className="tamay-actions">
        {step > 0 && (
          <button type="button" className="tamay-btn tamay-btn-secondary" onClick={goBack}>
            Back
          </button>
        )}
        {!isLastStep ? (
          <button type="button" className="tamay-btn" onClick={goNext}>
            Next
          </button>
        ) : (
          <button type="button" className="tamay-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        )}
        {status && <div className="tamay-status">{status}</div>}
      </div>
    </div>
  );
}
