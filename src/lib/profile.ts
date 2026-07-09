export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  is_staff?: boolean;
};

export function profileDisplayName(profile: Pick<UserProfile, "first_name" | "last_name">): string {
  return `${profile.first_name} ${profile.last_name}`.trim();
}
