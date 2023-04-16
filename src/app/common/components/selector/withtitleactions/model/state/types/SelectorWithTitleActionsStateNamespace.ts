const selectorWithActionsStateNamespaces = {
  dashboardGroupSelector: 'dashboardGroupSelector',
  dashboardSelector: 'dashboardSelector',
  dataSourceSelector: 'dataSourceSelector',
  measureSelector: 'measureSelector',
  dimensionSelector: 'dimensionSelector',
  reportTemplateGroupSelector: 'reportTemplateGroupSelector',
  reportTemplateSelector: 'reportTemplateGroupSelector',
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

export type SelectorWithTitleActionsStateNamespace = keyof typeof selectorWithActionsStateNamespaces;

export default selectorWithActionsStateNamespaces;
