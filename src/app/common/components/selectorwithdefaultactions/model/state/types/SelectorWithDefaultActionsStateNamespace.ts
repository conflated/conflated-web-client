const selectorWithDefaultActionsStateNamespaces = {
  dashboardGroupSelector: 'dashboardGroupSelector',
  dashboardSelector: 'dashboardSelector',
  dataSourceSelector: 'dataSourceSelector',
  measureSelector: 'measureSelector',
  dimensionSelector: 'dimensionSelector',
  dashboardsPageFilterSelector: 'dashboardsPageFilterSelector',
  dashboardsPageSortBySelector: 'dashboardsPageSortBySelector',
  dataExplorerPageFilterSelector: 'dataExplorerPageFilterSelector',
  dataExplorerPageSortBySelector: 'dataExplorerPageSortBySelector',
  alertsPageTriggerDataSourceSelector: 'alertsPageTriggerDataSourceSelector',
  alertsPageTriggerGroupSelector: 'alertsPageTriggerGroupSelector',
  alertsPageTriggerSelector: 'alertsPageTriggerSelector',
  goalsPageTriggerDataSourceSelector: 'goalsPageTriggerDataSourceSelector',
  goalsPageTriggerGroupSelector: 'goalsPageTriggerGroupSelector',
  goalsPageTriggerSelector: 'goalsPageTriggerSelector'
} as Record<string, string>;

export type SelectorWithDefaultActionsStateNamespace = keyof typeof selectorWithDefaultActionsStateNamespaces;

export default selectorWithDefaultActionsStateNamespaces;
