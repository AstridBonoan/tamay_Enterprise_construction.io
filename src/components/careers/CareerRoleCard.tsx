import type { CareerRoleGroup } from "@/lib/careerRoles";
import { careerApplyHref, careerApplyLabel } from "@/lib/careerRoles";
import { Button } from "@/components/ui/Button";
import { JoinTeamButton } from "@/components/careers/JoinTeamChoice";

type CareerRoleCardProps = {
  group: CareerRoleGroup;
};

export function CareerRoleCard({ group }: CareerRoleCardProps) {
  const label = careerApplyLabel(group);

  return (
    <article className="border border-gray-200 bg-white p-6 md:p-8 shadow-sm flex flex-col h-full">
      <h3 className="font-heading text-lg md:text-xl text-tamay-primary font-semibold mb-4">
        {group.category}
      </h3>
      <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm leading-relaxed flex-1 mb-6">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      {group.applyHref ? (
        <Button href={group.applyHref} variant="primary" className="w-full sm:w-auto">
          {label}
        </Button>
      ) : (
        <JoinTeamButton
          employeeHref={careerApplyHref(group.id)}
          variant="primary"
          className="w-full sm:w-auto"
        >
          {label}
        </JoinTeamButton>
      )}
    </article>
  );
}
