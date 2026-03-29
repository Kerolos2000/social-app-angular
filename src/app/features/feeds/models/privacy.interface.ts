export type Privacy = 'public' | 'following' | 'only_me';

export interface VisibilityOption {
  value: Privacy;
  label: string;
  icon: string;
}

export const PRIVACY_CONFIG: Record<
  Privacy,
  Omit<VisibilityOption, 'value'>
> = {
  public: { label: 'Public', icon: 'fa-solid fa-earth-americas' },
  following: { label: 'Following', icon: 'fa-solid fa-user-group' },
  only_me: { label: 'Only Me', icon: 'fa-solid fa-lock' },
};

export const VISIBILITY_OPTIONS: VisibilityOption[] = (
  Object.keys(PRIVACY_CONFIG) as Privacy[]
).map((key) => ({
  value: key,
  ...PRIVACY_CONFIG[key],
}));
