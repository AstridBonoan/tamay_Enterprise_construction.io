"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  CAREER_ROLE_SELECT_OPTIONS,
  findCareerRoleGroup,
} from "@/lib/careerRoles";

export function CareerApplicationForm() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get("role");
  const group = findCareerRoleGroup(roleId);

  const defaultRole = useMemo(() => {
    if (!group) return undefined;
    const first = group.items[0];
    return `${group.id}::${first}`;
  }, [group]);

  return (
    <ContactForm
      submitLabel="Submit application"
      showRecaptchaNote={false}
      defaultValues={defaultRole ? { role: defaultRole } : undefined}
      fields={[
        {
          name: "role",
          label: "Position you are applying for",
          type: "select",
          required: true,
          options: CAREER_ROLE_SELECT_OPTIONS.map((o) => o.value),
          optionLabels: CAREER_ROLE_SELECT_OPTIONS.map((o) => o.label),
        },
        { name: "name", label: "Full name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "experience", label: "Experience & qualifications", type: "textarea", required: true },
        { name: "message", label: "Additional information", type: "textarea" },
      ]}
    />
  );
}
