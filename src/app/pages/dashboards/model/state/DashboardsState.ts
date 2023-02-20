import type { DashboardGroup } from './types/DashboardGroup';
import type { Dashboard } from './types/Dashboard';

export type DashboardsState = {
  readonly dashboardGroups: DashboardGroup[];
  readonly selectedDashboardGroup?: DashboardGroup;
  readonly selectedDashboard?: Dashboard;
  readonly isFetchingDashboardGroups: boolean;
  readonly isDashboardsSlideShowPlaying: boolean;
  readonly dashboardsSlideShowIntervalId: ReturnType<typeof setInterval>;
  readonly dashboardSlideChangeIntervalInSecsStr: string;
  readonly dashboardIndexShownInSlideShow: number;
};
