import type { TriggersPageStateNamespace } from '../../../../page/triggers/model/state/TriggersPageStateNamespace';

export type ChartAreaPageStateNamespace =
  | 'dataExplorerPage'
  | 'dashboardsPage'
  | 'reportsPage'
  | TriggersPageStateNamespace;
