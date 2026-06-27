"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { syncContactFromForm, fetchAddresses } from "@/lib/account-data";
import {
  BUSINESS_STRUCTURE_OPTIONS,
  ENGAGEMENT_TYPE_OPTIONS,
  FORMSPREE_SUBCONTRACTOR_APPLICATION,
  SUBCONTRACTOR_APPLICATION_STEPS,
  TRADE_ROLE_OPTIONS,
  emptySubcontractorApplicationForm,
  validateSubcontractorApplication,
  validateSubcontractorApplicationStep,
  type SubcontractorApplicationFormData,
} from "@/lib/subcontractorApplication";
import {
  saveSubcontractorApplication,
  subcontractorApplicationSignatureReference,
  uploadSubcontractorApplicationSignature,
} from "@/lib/subcontractorApplicationSubmission";
import "@/styles/job-application-form.css";

const SignatureCanvasField = dynamic(
  () =>
    import("@/components/careers/SignatureCanvasField").then((mod) => mod.SignatureCanvasField),
  {
    ssr: false,
    loading: () => <p className="tamay-note">Loading signature pad…</p>,
  },
);

export function SubcontractorApplicationForm() {
  const { user, refreshUser } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SubcontractorApplicationFormData>(() =>
    emptySubcontractorApplicationForm(),
  );
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
        contact_name: prev.contact_name || fullName,
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
    <K extends keyof SubcontractorApplicationFormData>(
      key: K,
      value: SubcontractorApplicationFormData[K],
    ) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setStatus("");
    },
    [],
  );

  const goNext = () => {
    const error = validateSubcontractorApplicationStep(step, data);
    if (error) {
      setStatus(error);
      return;
    }
    setStep((current) => Math.min(current + 1, SUBCONTRACTOR_APPLICATION_STEPS.length - 1));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const error = validateSubcontractorApplication(data);
    if (error) {
      setStatus(error);
      return;
    }

    setSubmitting(true);
    setStatus("");

    let applicationId: string;
    let signaturePath: string;

    try {
      signaturePath = await uploadSubcontractorApplicationSignature(data.signature_data_url);
      applicationId = await saveSubcontractorApplication(data, signaturePath, user?.id);
    } catch {
      setStatus("Unable to save your signature right now. Please try again.");
      setSubmitting(false);
      return;
    }

    const body = new FormData();
    body.append("form_name", "Tamay - Subcontractor Application");
    body.append("_subject", "New Subcontractor Application - Tamay Enterprises Inc.");
    body.append("contact_name", data.contact_name);
    body.append("company_name", data.company_name);
    body.append("phone", data.phone);
    body.append("email", data.email);
    body.append("address_line1", data.address_line1);
    body.append("address_line2", data.address_line2);
    body.append("zip", data.zip);
    body.append("city", data.city);
    body.append("state", data.state);
    body.append("business_structure", data.business_structure);
    body.append("trade_specialty", data.trade_specialty);
    body.append("trade_other", data.trade_other);
    body.append("years_in_business", data.years_in_business);
    body.append("service_area", data.service_area);
    body.append("crew_size", data.crew_size);
    body.append("engagement_type", data.engagement_type);
    body.append("available_start_date", data.available_start_date);
    body.append("availability_details", data.availability_details);
    body.append("general_liability_insurance", data.general_liability_insurance);
    body.append("workers_comp_insurance", data.workers_comp_insurance);
    body.append("licensed_trade", data.licensed_trade);
    body.append("license_number", data.license_number);
    body.append("work_authorized", data.work_authorized);
    body.append("agree_background", data.agree_background);
    body.append("confirm_truth", data.confirm_truth ? "Yes" : "No");
    body.append("application_id", applicationId);
    body.append("signature_storage_path", subcontractorApplicationSignatureReference(signaturePath));
    body.append("signature_date", data.signature_date);
    if (data.insurance_cert_file) {
      body.append("insurance_cert_file", data.insurance_cert_file);
    }
    if (data.portfolio_file) {
      body.append("portfolio_file", data.portfolio_file);
    }

    try {
      const response = await fetch(FORMSPREE_SUBCONTRACTOR_APPLICATION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        if (user) {
          try {
            await syncContactFromForm(user.id, {
              phone: data.phone,
              fullName: data.contact_name,
              line1: data.address_line1,
              line2: data.address_line2 || undefined,
              city: data.city,
              state: data.state,
              zip: data.zip,
              label: "Business",
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
            Thank you for your interest in partnering with Tamay Enterprises Inc.
            <br />
            Our team will review your subcontractor application and contact you if we move forward
            with a partnership opportunity.
          </p>
        </div>
      </div>
    );
  }

  const current = SUBCONTRACTOR_APPLICATION_STEPS[step];
  const isLastStep = step === SUBCONTRACTOR_APPLICATION_STEPS.length - 1;

  return (
    <div className="tamay-wrap">
      <div className="tamay-header">
        <h2>Subcontractor Application – Tamay Enterprises Inc.</h2>
        <p>
          Step {step + 1} of {SUBCONTRACTOR_APPLICATION_STEPS.length}. Fields marked with * are
          required.
        </p>
      </div>

      <nav className="tamay-progress" aria-label="Application steps">
        {SUBCONTRACTOR_APPLICATION_STEPS.map((item, index) => (
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
              Primary Contact Name *
              <input
                type="text"
                required
                value={data.contact_name}
                onChange={(e) => update("contact_name", e.target.value)}
              />
            </label>

            <label>
              Company / Business Name (optional)
              <input
                type="text"
                placeholder="Leave blank if sole proprietor"
                value={data.company_name}
                onChange={(e) => update("company_name", e.target.value)}
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
              Business Address *
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
                  Suite / Unit (optional)
                  <input
                    type="text"
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

            <label>
              Business Structure *
              <select
                required
                value={data.business_structure}
                onChange={(e) => update("business_structure", e.target.value)}
              >
                <option value="">Select one</option>
                {BUSINESS_STRUCTURE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <label>
              Primary Trade / Specialty *
              <select
                required
                value={data.trade_specialty}
                onChange={(e) => update("trade_specialty", e.target.value)}
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
                value={data.trade_other}
                onChange={(e) => update("trade_other", e.target.value)}
              />
            </label>

            <div className="tamay-grid">
              <div className="tamay-col">
                <label>
                  Years in Business *
                  <input
                    type="text"
                    required
                    placeholder="Example: 5"
                    value={data.years_in_business}
                    onChange={(e) => update("years_in_business", e.target.value)}
                  />
                </label>
              </div>
              <div className="tamay-col">
                <label>
                  Typical Crew Size *
                  <input
                    type="text"
                    required
                    placeholder="Example: 2–4"
                    value={data.crew_size}
                    onChange={(e) => update("crew_size", e.target.value)}
                  />
                </label>
              </div>
            </div>

            <label>
              Service Area *
              <input
                type="text"
                required
                placeholder="Example: New Haven County, Fairfield County"
                value={data.service_area}
                onChange={(e) => update("service_area", e.target.value)}
              />
            </label>

            <label>
              Preferred Engagement Type *
              <select
                required
                value={data.engagement_type}
                onChange={(e) => update("engagement_type", e.target.value)}
              >
                <option value="">Select one</option>
                {ENGAGEMENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <div className="tamay-grid">
              <div className="tamay-col">
                <label>
                  Available Start Date *
                  <input
                    type="date"
                    required
                    value={data.available_start_date}
                    onChange={(e) => update("available_start_date", e.target.value)}
                  />
                </label>
              </div>
            </div>

            <label>
              Availability / Scheduling Notes *
              <textarea
                required
                rows={3}
                placeholder="Example: Mon–Fri, can start within 2 weeks notice"
                value={data.availability_details}
                onChange={(e) => update("availability_details", e.target.value)}
              />
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <label>
              General Liability Insurance? *
              <select
                required
                value={data.general_liability_insurance}
                onChange={(e) => update("general_liability_insurance", e.target.value)}
              >
                <option value="">Select one</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>

            <label>
              Workers&apos; Compensation Insurance? *
              <select
                required
                value={data.workers_comp_insurance}
                onChange={(e) => update("workers_comp_insurance", e.target.value)}
              >
                <option value="">Select one</option>
                <option>Yes</option>
                <option>No</option>
                <option>Not applicable (no employees)</option>
              </select>
            </label>

            <label>
              Licensed for your trade (where required)? *
              <select
                required
                value={data.licensed_trade}
                onChange={(e) => update("licensed_trade", e.target.value)}
              >
                <option value="">Select one</option>
                <option>Yes</option>
                <option>No</option>
                <option>Not applicable</option>
              </select>
            </label>

            <label>
              License Number (if applicable)
              <input
                type="text"
                placeholder="CT license # or registration"
                value={data.license_number}
                onChange={(e) => update("license_number", e.target.value)}
              />
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <label>
              Certificate of Insurance (Recommended)
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => update("insurance_cert_file", e.target.files?.[0] ?? null)}
              />
            </label>

            <label>
              Portfolio / Company Profile (Optional)
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => update("portfolio_file", e.target.files?.[0] ?? null)}
              />
            </label>

            <p className="tamay-note">
              Uploading insurance and portfolio documents helps us review your application faster.
            </p>
            <p className="tamay-note">Accepted formats: PDF, JPG, PNG, DOC, DOCX.</p>
          </>
        )}

        {step === 4 && (
          <>
            <label>
              Authorized to work / operate in the U.S.? *
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
              subcontractor partnership opportunities.
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
