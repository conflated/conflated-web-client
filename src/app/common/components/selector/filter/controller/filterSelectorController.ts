import { Controller } from 'oo-redux-utils2';
import AddMeasureFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/selectedfilter/AddMeasureFilterToSelectedChartAction';
import RemoveSelectedFilterFromSelectedChartAction from '../../../chartarea/model/actions/chart/selected/remove/RemoveSelectedFilterFromSelectedChartAction';
import ChangeSelectedFilterAggregationFunctionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterAggregationFunctionForSelectedChartAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import ChangeSelectedFilterInputTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterInputTypeForSelectedChartAction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/filters/filter/inputtype/FilterInputType';
import ChangeSelectedFilterDataScopeTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import AddDimensionFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/selectedfilter/AddDimensionFilterToSelectedChartAction';
import ChangeSelectedFilterExpressionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterExpressionForSelectedChartAction';
import type { Filter } from '../../../chartarea/chart/model/state/filters/filter/Filter';
import selectorWithActionsStateNamespaces from '../../withactions/model/state/types/SelectorWithActionsStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import selectShownDimensions from '../../../../../page/dataexplorer/pane/left/selector/dimension/controller/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../../../page/dataexplorer/pane/left/selector/measure/controller/selectors/selectShownMeasures';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { controller as selectorWithActionsController } from '../../withactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/FilterSelectorView';
import { FilterSelectorStateNamespace } from '../model/state/FilterSelectorStateNamespace';

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

    changeSelectedFilterAggregationFunctionForSelectedChart: (
      selectedFilter: Filter,
      aggregationFunction: AggregationFunction
    ) => {
      this.dispatch(
        new ChangeSelectedFilterAggregationFunctionForSelectedChartAction(
          stateNamespace,
          selectedFilter,
          aggregationFunction
        )
      );
    },

    changeSelectedFilterExpressionForSelectedChart: (selectedFilter: Filter, expression: string) => {
      this.dispatch(
        new ChangeSelectedFilterExpressionForSelectedChartAction(stateNamespace, selectedFilter, expression)
      );
    },

    changeSelectedFilterInputTypeForSelectedChart: (selectedFilter: Filter, filterInputType: FilterInputType) => {
      this.dispatch(
        new ChangeSelectedFilterInputTypeForSelectedChartAction(stateNamespace, selectedFilter, filterInputType)
      );
    },

    changeSelectedFilterDataScopeTypeForSelectedChart: (selectedFilter: Filter, dataScopeType: DataScopeType) => {
      this.dispatch(
        new ChangeSelectedFilterDataScopeTypeForSelectedChartAction(stateNamespace, selectedFilter, dataScopeType)
      );
    },

    removeSelectedFilterFromSelectedChart: (selectedFilter: Filter) => {
      this.dispatch(new RemoveSelectedFilterFromSelectedChartAction(stateNamespace, selectedFilter));
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
