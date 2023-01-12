import type { Dashboard } from './Dashboard';

export type DashboardGroup = {
  readonly name: string;
  readonly dashboards: Dashboard[];
};
