"use client";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
};

type ContactFormProps = {
  fields: Field[];
  submitLabel?: string;
  showRecaptchaNote?: boolean;
};

export function ContactForm({
  fields,
  submitLabel = "Send",
  showRecaptchaNote = true,
}: ContactFormProps) {
  return (
    <form
      className="space-y-4 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submission will connect to your backend. Replace this handler when ready.");
      }}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              required={field.required}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
            />
          ) : field.type === "select" && field.options ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary bg-white"
            >
              <option value="">Select...</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-tamay-primary hover:bg-tamay-primary-dark text-white font-bold py-3 text-sm tracking-wide transition-colors"
      >
        {submitLabel}
      </button>
      {showRecaptchaNote && (
        <p className="text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      )}
    </form>
  );
}
