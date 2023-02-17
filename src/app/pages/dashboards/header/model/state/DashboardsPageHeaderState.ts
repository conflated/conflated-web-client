export type DashboardsPageHeaderState = {
  readonly shouldShowDashboardsHeader: boolean;
  readonly shouldShowKeyboardShortcuts: boolean;
  readonly shouldShowDashboardsHeaderPermanently: boolean;
  readonly dashboardsHeaderHideDelayInMillis: number;
  readonly dashboardsHeaderHideTimeoutId: ReturnType<typeof setTimeout>;
  readonly dashboardsHeaderDelayedHideTimeoutId: ReturnType<typeof setTimeout>;
};
