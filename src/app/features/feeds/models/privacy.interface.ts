export type Privacy = 'public' | 'following' | 'only_me';

export interface VisibilityOption {
  value: Privacy;
  label: string;
  icon: string;
}
