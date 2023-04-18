import { Controller } from 'oo-redux-utils2';
import AddMeasureFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/filter/AddMeasureFilterToSelectedChartAction';
import RemoveFilterFromSelectedChartAction from '../../../chartarea/model/actions/chart/selected/remove/RemoveFilterFromSelectedChartAction';
import ChangeFilterAggregationFunctionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/filter/ChangeFilterAggregationFunctionForSelectedChartAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../../page/model/actions/pane/visibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import ChangeFilterInputTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/filter/ChangeFilterInputTypeForSelectedChartAction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/filters/filter/inputtype/FilterInputType';
import ChangeFilterDataScopeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/filter/ChangeFilterDataScopeForSelectedChartAction';
import type { DataScope } from '../../../chartarea/chart/model/state/types/DataScope';
import AddDimensionFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/filter/AddDimensionFilterToSelectedChartAction';
import ChangeFilterExpressionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/filter/ChangeFilterExpressionForSelectedChartAction';
import type { Filter } from '../../../chartarea/chart/model/state/filters/filter/Filter';
import selectorWithActionsStateNamespaces from '../../withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import selectShownDimensions from '../../../../../page/dataexplorer/pane/left/selector/dimension/controller/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../../../page/dataexplorer/pane/left/selector/measure/controller/selectors/selectShownMeasures';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { controller as selectorWithActionsController } from '../../withtitleactions/controller/selectorWithTitleActionsController';
import { OwnProps } from '../view/FilterSelectorView';
import { FilterSelectorStateNamespace } from '../model/state/FilterSelectorStateNamespace';
import { Chart } from '../../../chartarea/chart/model/state/Chart';
import AddChartFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/filter/AddChartFilterToSelectedChartAction';

class FilterSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) => ({
    charts: appState[stateNamespace].chartAreaState.charts,
    selectedChart: appState[stateNamespace].chartAreaState.selectedChart,
    shownDimensions: selectShownDimensions(false)(appState),
    shownMeasures: selectShownMeasures(appState),

    shouldShowPageRightPanePermanently:
      appState.common.pageStates[stateNamespace].shouldShowPagePanePermanently.rightPane,

    isSortBySelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}SortBySelector`]].isSelectorOpen,

    isDataPointsCountSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}DataPointsCountSelector`]].isSelectorOpen
  });

  getActionDispatchers = (stateNamespace: FilterSelectorStateNamespace) => ({
    addDimensionFilterToSelectedChart: (dimension: Dimension) => {
      this.dispatch(new AddDimensionFilterToSelectedChartAction(stateNamespace, dimension));
    },

    addMeasureFilterToSelectedChart: (measure: Measure) => {
      this.dispatch(new AddMeasureFilterToSelectedChartAction(stateNamespace, measure));
    },

    addChartFilterToSelectedChart: (filteringChart: Chart) =>
      this.dispatch(new AddChartFilterToSelectedChartAction(stateNamespace, filteringChart)),

    changeFilterAggregationFunctionForSelectedChart: (filter: Filter, aggregationFunction: AggregationFunction) => {
      this.dispatch(
        new ChangeFilterAggregationFunctionForSelectedChartAction(stateNamespace, filter, aggregationFunction)
      );
    },

    changeFilterExpressionForSelectedChart: (selectedFilter: Filter, expression: string) => {
      this.dispatch(new ChangeFilterExpressionForSelectedChartAction(stateNamespace, selectedFilter, expression));
    },

    changeFilterInputTypeForSelectedChart: (selectedFilter: Filter, filterInputType: FilterInputType) => {
      this.dispatch(new ChangeFilterInputTypeForSelectedChartAction(stateNamespace, selectedFilter, filterInputType));
    },

    changeFilterDataScopeTypeForSelectedChart: (selectedFilter: Filter, dataScopeType: DataScope) => {
      this.dispatch(new ChangeFilterDataScopeForSelectedChartAction(stateNamespace, selectedFilter, dataScopeType));
    },

    removeFilterFromSelectedChart: (selectedFilter: Filter) => {
      this.dispatch(new RemoveFilterFromSelectedChartAction(stateNamespace, selectedFilter));
    },

    toggleShouldShowPageRightPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction(stateNamespace, 'rightPane')),

    toggleMaximizeSelector: selectorWithActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}FilterSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new FilterSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
