import { Controller } from 'oo-redux-utils2';
import AddMeasureFilterToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedfilter/AddMeasureFilterToSelectedChartAction';
import RemoveSelectedFilterFromSelectedChartAction from '../../chartarea/model/actions/chart/selected/remove/RemoveSelectedFilterFromSelectedChartAction';
import ChangeSelectedFilterAggregationFunctionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterAggregationFunctionForSelectedChartAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Dimension } from '../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { AggregationFunction } from '../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import ChangeSelectedFilterInputTypeForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterInputTypeForSelectedChartAction';
import type { FilterInputType } from '../../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import ChangeSelectedFilterDataScopeTypeForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../../model/state/types/DataScopeType';
import AddDimensionFilterToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedfilter/AddDimensionFilterToSelectedChartAction';
import ChangeSelectedFilterExpressionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterExpressionForSelectedChartAction';
import type { SelectedFilter } from '../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import StartFetchDataForFilterAddedToSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForFilterAddedToSelectedChartAction';
import StartFetchDataForChangedFilterInSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import selectorWithActionsStateNamespaces from '../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import { AppState } from '../../../../../store/AppState';
import selectShownDimensions from '../../../model/state/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../model/state/selectors/selectShownMeasures';
import selectorStateNamespaces from '../../selector/model/state/types/SelectorStateNamespace';
import { PageStateNamespace } from '../../page/model/state/types/PageStateNamespace';
import store from '../../../../../store/store';
import { controller as selectorWithActionsController } from '../../selectorwithactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/FilterSelectorView';
import { FilterSelectorPageStateNamespace } from '../model/state/FilterSelectorPageStateNamespace';

class FilterSelectorController extends Controller<PageStateNamespace> {
  getState(appState: AppState, { pageStateNamespace }: OwnProps) {
    return {
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
    };
  }

  getActionDispatchers = (pageStateNamespace: FilterSelectorPageStateNamespace) => ({
    addDimensionFilterToSelectedChart: (dimension: Dimension) => {
      this.dispatch(new AddDimensionFilterToSelectedChartAction(pageStateNamespace, dimension));
      this.dispatchWithDi(StartFetchDataForFilterAddedToSelectedChartAction, diContainer, { pageStateNamespace });
    },

    addMeasureFilterToSelectedChart: (measure: Measure) => {
      this.dispatch(new AddMeasureFilterToSelectedChartAction(pageStateNamespace, measure));
      this.dispatchWithDi(StartFetchDataForFilterAddedToSelectedChartAction, diContainer, { pageStateNamespace });
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

      if (selectedFilter.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { pageStateNamespace });
      }
    },

    changeSelectedFilterExpressionForSelectedChart: (selectedFilter: SelectedFilter, expression: string) => {
      this.dispatch(
        new ChangeSelectedFilterExpressionForSelectedChartAction(pageStateNamespace, selectedFilter, expression)
      );

      if (selectedFilter.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { pageStateNamespace });
      }
    },

    changeSelectedFilterInputTypeForSelectedChart: (
      selectedFilter: SelectedFilter,
      filterInputType: FilterInputType
    ) => {
      this.dispatch(
        new ChangeSelectedFilterInputTypeForSelectedChartAction(pageStateNamespace, selectedFilter, filterInputType)
      );

      this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
        selectedFilter,
        pageStateNamespace
      });
    },

    changeSelectedFilterDataScopeTypeForSelectedChart: (
      selectedFilter: SelectedFilter,
      dataScopeType: DataScopeType
    ) => {
      this.dispatch(
        new ChangeSelectedFilterDataScopeTypeForSelectedChartAction(pageStateNamespace, selectedFilter, dataScopeType)
      );

      this.dispatchWithDi(StartFetchDataForChangedFilterInSelectedChartAction, diContainer, {
        selectedFilter,
        pageStateNamespace
      });
    },

    removeSelectedFilterFromSelectedChart: (selectedFilter: SelectedFilter) => {
      this.dispatch(new RemoveSelectedFilterFromSelectedChartAction(pageStateNamespace, selectedFilter));

      if (selectedFilter.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { pageStateNamespace });
      }
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
