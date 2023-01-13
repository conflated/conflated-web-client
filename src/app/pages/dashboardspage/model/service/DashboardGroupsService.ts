import type { DashboardGroup } from '../state/entities/DashboardGroup';

export interface DashboardGroupsService {
  fetchDashboardGroups(): Promise<DashboardGroup[]>;
}
