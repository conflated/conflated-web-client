import selectorWithActionsStateNamespaces from '../../../withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';

const selectorStateNamespaces = {
  ...selectorWithActionsStateNamespaces,
  layoutSelector: 'layoutSelector',
  chartTypeSelector: 'chartTypeSelector',
  dataExplorerPageDataPointsCountSelector: 'dataExplorerPageDataPointsCountSelector',
  dashboardsPageDataPointsCountSelector: 'dashboardsPageDataPointsCountSelector'
} as Record<string, string>;

export type SelectorStateNamespace = keyof typeof selectorStateNamespaces;

export default selectorStateNamespaces;
