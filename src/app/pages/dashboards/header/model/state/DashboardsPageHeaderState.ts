export type DashboardsPageHeaderState = {
  readonly shouldShowDashboardsHeader: boolean;
  readonly shouldShowDashboardsHeaderPermanently: boolean;
  readonly shouldShowKeyboardShortcutsMessage: boolean;
  readonly dashboardsHeaderHideDelayInMillis: number;
  readonly dashboardsHeaderHideTimeoutId: ReturnType<typeof setTimeout>;
  readonly dashboardsHeaderDelayedHideTimeoutId: ReturnType<typeof setTimeout>;
  readonly dashboardNameFilterText: string;
  readonly dashboardGroupNameFilterText: string;
  readonly activeDashboardsTabPane: 'ALL' | 'FAVORITES';
  readonly activeDashboardGroupsTabPane: 'ALL' | 'FAVORITES';
};
