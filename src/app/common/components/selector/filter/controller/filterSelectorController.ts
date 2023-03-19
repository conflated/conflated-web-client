import { Controller } from 'oo-redux-utils2';
import AddMeasureFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/selectedfilter/AddMeasureFilterToSelectedChartAction';
import RemoveSelectedFilterFromSelectedChartAction from '../../../chartarea/model/actions/chart/selected/remove/RemoveSelectedFilterFromSelectedChartAction';
import ChangeSelectedFilterAggregationFunctionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterAggregationFunctionForSelectedChartAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Dimension } from '../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import ChangeSelectedFilterInputTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterInputTypeForSelectedChartAction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import ChangeSelectedFilterDataScopeTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import AddDimensionFilterToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/selectedfilter/AddDimensionFilterToSelectedChartAction';
import ChangeSelectedFilterExpressionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterExpressionForSelectedChartAction';
import type { SelectedFilter } from '../../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import selectorWithActionsStateNamespaces from '../../withactions/model/state/types/SelectorWithActionsStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import selectShownDimensions from '../../../../../pages/dataexplorer/leftpane/dimensionselector/controller/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../../../pages/dataexplorer/leftpane/measureselector/controller/selectors/selectShownMeasures';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { controller as selectorWithActionsController } from '../../withactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/FilterSelectorView';
import { FilterSelectorPageStateNamespace } from '../model/state/FilterSelectorPageStateNamespace';

class FilterSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) => ({
    selectedChart: appState[pageStateNamespace].chartAreaState.selectedChart,
    shownDimensions: selectShownDimensions(false)(appState),
    shownMeasures: selectShownMeasures(appState),

    shouldShowPageRightPanePermanently:
      appState.common.pageStates[pageStateNamespace].shouldShowPagePanePermanently.rightPane,

    isSortBySelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}SortBySelector`]].isSelectorOpen,

    isDataPointsCountSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}DataPointsCountSelector`]]
        .isSelectorOpen
  });

  getActionDispatchers = (pageStateNamespace: FilterSelectorPageStateNamespace) => ({
    addDimensionFilterToSelectedChart: (dimension: Dimension) => {
      this.dispatch(new AddDimensionFilterToSelectedChartAction(pageStateNamespace, dimension));
    },

    addMeasureFilterToSelectedChart: (measure: Measure) => {
      this.dispatch(new AddMeasureFilterToSelectedChartAction(pageStateNamespace, measure));
    },

    changeSelectedFilterAggregationFunctionForSelectedChart: (
      selectedFilter: SelectedFilter,
      aggregationFunction: AggregationFunction
    ) => {
      this.dispatch(
        new ChangeSelectedFilterAggregationFunctionForSelectedChartAction(
          pageStateNamespace,
          selectedFilter,
          aggregationFunction
        )
      );
    },

    changeSelectedFilterExpressionForSelectedChart: (selectedFilter: SelectedFilter, expression: string) => {
      this.dispatch(
        new ChangeSelectedFilterExpressionForSelectedChartAction(pageStateNamespace, selectedFilter, expression)
      );
    },

    changeSelectedFilterInputTypeForSelectedChart: (
      selectedFilter: SelectedFilter,
      filterInputType: FilterInputType
    ) => {
      this.dispatch(
        new ChangeSelectedFilterInputTypeForSelectedChartAction(pageStateNamespace, selectedFilter, filterInputType)
      );
    },

    changeSelectedFilterDataScopeTypeForSelectedChart: (
      selectedFilter: SelectedFilter,
      dataScopeType: DataScopeType
    ) => {
      this.dispatch(
        new ChangeSelectedFilterDataScopeTypeForSelectedChartAction(pageStateNamespace, selectedFilter, dataScopeType)
      );
    },

    removeSelectedFilterFromSelectedChart: (selectedFilter: SelectedFilter) => {
      this.dispatch(new RemoveSelectedFilterFromSelectedChartAction(pageStateNamespace, selectedFilter));
    },

    toggleShouldShowPageRightPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction(pageStateNamespace, 'rightPane')),

    toggleMaximizeSelector: selectorWithActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${pageStateNamespace}FilterSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new FilterSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
