import type { TriggersPageStateNamespace } from '../../../../triggerspage/model/state/TriggersPageStateNamespace';

export type ChartAreaPageStateNamespace =
  | 'dataExplorerPage'
  | 'dashboardsPage'
  | 'reportsPage'
  | TriggersPageStateNamespace;
