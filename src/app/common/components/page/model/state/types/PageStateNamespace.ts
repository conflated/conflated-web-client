const pageStateNamespaces = {
  dashboardsPage: 'dashboardsPage',
  dataExplorerPage: 'dataExplorerPage',
  alertsPage: 'alertsPage',
  goalsPage: 'goalsPage',
  reportsPage: 'reportsPage'
};

export type PageStateNamespace = keyof typeof pageStateNamespaces;

export default pageStateNamespaces;
