import type { DashboardGroup } from './entities/DashboardGroup';
import type { Dashboard } from './entities/Dashboard';

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
