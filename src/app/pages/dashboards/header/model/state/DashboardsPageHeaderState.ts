export type DashboardsPageHeaderState = {
  readonly shouldShowDashboardsHeader: boolean;
  readonly shouldShowDashboardsHeaderPermanently: boolean;
  readonly dashboardsHeaderHideDelayInMillis: number;
  readonly dashboardsHeaderHideTimeoutId: ReturnType<typeof setTimeout>;
  readonly dashboardsHeaderDelayedHideTimeoutId: ReturnType<typeof setTimeout>;
  readonly dashboardFilterText: string;
  readonly dashboardGroupFilterText: string;
};
