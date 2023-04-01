import type { DashboardGroup } from '../state/types/DashboardGroup';

export interface DashboardGroupsService {
  fetchDashboardGroups(): Promise<DashboardGroup[]>;
}
