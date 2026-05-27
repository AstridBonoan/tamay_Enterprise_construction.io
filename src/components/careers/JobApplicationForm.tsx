"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FORMSPREE_JOB_APPLICATION,
  JOB_APPLICATION_STEPS,
  POSITION_OPTIONS,
  PRIMARY_INTEREST_OPTIONS,
  defaultPositionFromRoleId,
  emptyJobApplicationForm,
  type JobApplicationFormData,
} from "@/lib/jobApplication";
import "@/styles/job-application-form.css";

function validateStep(step: number, data: JobApplicationFormData): string | null {
  switch (step) {
    case 0:
      if (!data.full_name.trim()) return "Full name is required.";
      if (!data.phone.trim()) return "Phone is required.";
      if (!data.email.trim()) return "Email is required.";
      if (!data.address_line1.trim()) return "Address is required.";
      if (!data.zip.trim()) return "Zip code is required.";
      if (!data.city.trim()) return "City is required.";
      if (!data.state.trim()) return "State is required.";
      return null;
    case 1:
      if (!data.primary_interest) return "Primary interest is required.";
      if (!data.position) return "Trade / role is required.";
      if (data.position === "Other" && !data.position_other.trim()) {
        return "Please specify your role under Other.";
      }
      if (!data.start_date) return "Available start date is required.";
      if (!data.employment_type) return "Employment type is required.";
      if (!data.availability_details.trim()) return "Days / hours available is required.";
      return null;
    case 2:
      return null;
    case 3:
      if (!data.drivers_license) return "Driver's license status is required.";
      if (!data.driving_issues) return "Driving history question is required.";
      return null;
    case 4:
      if (!data.work_authorized) return "Work authorization is required.";
      if (!data.agree_background) return "Background check agreement is required.";
      return null;
    case 5:
      if (!data.confirm_truth) return "Please confirm your information is accurate.";
      if (!data.signature.trim()) return "Signature is required.";
      if (!data.signature_date) return "Date is required.";
      return null;
    default:
      return null;
  }
}

export function JobApplicationForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<JobApplicationFormData>(() => emptyJobApplicationForm());
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const roleId = searchParams.get("role");
    const position = defaultPositionFromRoleId(roleId);
    if (position) {
      setData((prev) => ({ ...prev, position }));
    }
  }, [searchParams]);

  const update = useCallback(
    <K extends keyof JobApplicationFormData>(key: K, value: JobApplicationFormData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setStatus("");
    },
    []
  );

  const goNext = () => {
    const error = validateStep(step, data);
    if (error) {
      setStatus(error);
      return;
    }
    setStep((s) => Math.min(s + 1, JOB_APPLICATION_STEPS.length - 1));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const error = validateStep(step, data);
    if (error) {
      setStatus(error);
      return;
    }

    setSubmitting(true);
    setStatus("");

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
    body.append("signature", data.signature);
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
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const json = (await response.json().catch(() => ({}))) as {
          errors?: { message: string }[];
        };
        setStatus(
          json.errors?.map((e) => e.message).join(", ") ??
            "There was a problem submitting the application. Please try again."
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
      <div className="job-app">
        <div className="job-app-success">
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

  return (
    <div className="job-app">
      <div className="job-app-header">
        <h2>Job Application – Tamay Enterprises Inc.</h2>
        <p>
          Step {step + 1} of {JOB_APPLICATION_STEPS.length}. Fields marked with * are required.
        </p>
      </div>

      <nav className="job-app-progress" aria-label="Application steps">
        {JOB_APPLICATION_STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`job-app-progress-step ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""}`}
          >
            {s.label}
          </div>
        ))}
      </nav>

      <div className="job-app-card">
        <div className="job-app-legend">{current.title}</div>

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
            <div className="job-app-grid">
              <div className="job-app-col">
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
              <div className="job-app-col">
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
            <div className="job-app-grid">
              <div className="job-app-col">
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
              <div className="job-app-col">
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
            <div className="job-app-grid">
              <div className="job-app-col">
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
              <div className="job-app-col">
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
                {POSITION_OPTIONS.map((opt) => (
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
            <div className="job-app-grid">
              <div className="job-app-col">
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
              <div className="job-app-col">
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
            <p className="job-app-note">
              Applicants who submit a resume will receive stronger consideration.
            </p>
            <p className="job-app-note">Accepted formats: PDF, DOC, DOCX.</p>
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
            <label className="job-app-check">
              <input
                type="checkbox"
                checked={data.confirm_truth}
                onChange={(e) => update("confirm_truth", e.target.checked)}
              />
              I confirm that the information provided is accurate and complete. *
            </label>
            <label>
              Signature (Type Full Name) *
              <input
                type="text"
                required
                value={data.signature}
                onChange={(e) => update("signature", e.target.value)}
              />
            </label>
            <label>
              Date *
              <input
                type="date"
                required
                value={data.signature_date}
                onChange={(e) => update("signature_date", e.target.value)}
              />
            </label>
            <p className="job-app-note">
              By submitting this form, you agree that Tamay Enterprises Inc. may contact you regarding
              employment opportunities.
            </p>
          </>
        )}
      </div>

      <div className="job-app-actions">
        {step > 0 && (
          <button type="button" className="job-app-btn job-app-btn-secondary" onClick={goBack}>
            Back
          </button>
        )}
        {step < JOB_APPLICATION_STEPS.length - 1 ? (
          <button type="button" className="job-app-btn" onClick={goNext}>
            Next
          </button>
        ) : (
          <button
            type="button"
            className="job-app-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        )}
        {status && <div className="job-app-status">{status}</div>}
      </div>
    </div>
  );
}
