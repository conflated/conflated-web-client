const pageStateNamespaces = {
  dashboardsPage: 'dashboardsPage',
  dataExplorerPage: 'dataExplorerPage',
  alertsPage: 'alertsPage',
  alertDetailsDialog: 'alertDetailsDialog',
  goalsPage: 'goalsPage',
  reportsPage: 'reportsPage'
};

export type PageStateNamespace = keyof typeof pageStateNamespaces;

export default pageStateNamespaces;
