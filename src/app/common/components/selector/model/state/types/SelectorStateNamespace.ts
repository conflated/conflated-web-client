import selectorWithActionsStateNamespaces from '../../../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';

const selectorStateNamespaces = {
  ...selectorWithActionsStateNamespaces,
  layoutSelector: 'layoutSelector',
  chartTypeSelector: 'chartTypeSelector',
  dataExplorerPageDataPointsCountSelector: 'dataExplorerPageDataPointsCountSelector',
  dashboardsPageDataPointsCountSelector: 'dashboardsPageDataPointsCountSelector'
} as Record<string, string>;

export type SelectorStateNamespace = keyof typeof selectorStateNamespaces;

export default selectorStateNamespaces;
