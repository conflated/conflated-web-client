import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithactions/model/state/types/SelectorWithDefaultActionsStateNamespace';

const selectorStateNamespaces = {
  ...selectorWithDefaultActionsStateNamespaces,
  layoutSelector: 'layoutSelector',
  chartTypeSelector: 'chartTypeSelector',
  dataExplorerPageDataPointsCountSelector: 'dataExplorerPageDataPointsCountSelector',
  dashboardsPageDataPointsCountSelector: 'dashboardsPageDataPointsCountSelector'
} as Record<string, string>;

export type SelectorStateNamespace = keyof typeof selectorStateNamespaces;

export default selectorStateNamespaces;
