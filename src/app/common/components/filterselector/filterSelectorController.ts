import AddMeasureFilterToSelectedChartAction from '../chartarea/model/actions/chart/selected/add/selectedfilter/AddMeasureFilterToSelectedChartAction';
import RemoveSelectedFilterFromSelectedChartAction from '../chartarea/model/actions/chart/selected/remove/RemoveSelectedFilterFromSelectedChartAction';
import ChangeSelectedFilterAggregationFunctionForSelectedChartAction from '../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterAggregationFunctionForSelectedChartAction';
import ToggleShouldShowPagePanePermanentlyAction from '../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Dimension } from '../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { FilterSelectorPageStateNamespace } from './model/state/FilterSelectorPageStateNamespace';
import type { Measure } from '../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { AggregationFunction } from '../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import ChangeSelectedFilterInputTypeForSelectedChartAction from '../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterInputTypeForSelectedChartAction';
import type { FilterInputType } from '../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import ChangeSelectedFilterDataScopeTypeForSelectedChartAction from '../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../model/state/types/DataScopeType';
import AddDimensionFilterToSelectedChartAction from '../chartarea/model/actions/chart/selected/add/selectedfilter/AddDimensionFilterToSelectedChartAction';
import ChangeSelectedFilterExpressionForSelectedChartAction from '../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterExpressionForSelectedChartAction';
import type { SelectedFilter } from '../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import diContainer from '../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import StartFetchDataForFilterAddedToSelectedChartAction from '../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForFilterAddedToSelectedChartAction';
import StartFetchDataForChangedFilterInSelectedChartAction from '../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForChangedFilterInSelectedChartAction';
import selectorWithDefaultActionsStateNamespaces from '../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import { AppState } from '../../../../store/AppState';
import selectShownDimensions from '../../model/state/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../model/state/selectors/selectShownMeasures';
import selectorStateNamespaces from '../selector/model/state/types/SelectorStateNamespace';
import { ChartAreaPageStateNamespace } from '../chartarea/model/state/types/ChartAreaPageStateNamespace';
import Controller from '../../../../Controller';
import { PageStateNamespace } from '../page/model/state/types/PageStateNamespace';
import store from '../../../../store/store';
import { controller as selectorWithDefaultActionsController } from '../selectorwithdefaultactions/selectorWithDefaultActionsController';

class FilterSelectorController extends Controller<PageStateNamespace> {
  getState(appState: AppState, pageStateNamespace: FilterSelectorPageStateNamespace) {
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

  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      addDimensionFilterToSelectedChart: (dimension: Dimension) => {
        this.dispatch(new AddDimensionFilterToSelectedChartAction(stateNamespace, dimension));
        this.dispatchWithDi(diContainer, StartFetchDataForFilterAddedToSelectedChartAction, { stateNamespace });
      },

      addMeasureFilterToSelectedChart: (measure: Measure) => {
        this.dispatch(new AddMeasureFilterToSelectedChartAction(stateNamespace, measure));
        this.dispatchWithDi(diContainer, StartFetchDataForFilterAddedToSelectedChartAction, { stateNamespace });
      },

      changeSelectedFilterAggregationFunctionForSelectedChart: (
        selectedFilter: SelectedFilter,
        aggregationFunction: AggregationFunction
      ) => {
        this.dispatch(
          new ChangeSelectedFilterAggregationFunctionForSelectedChartAction(
            stateNamespace,
            selectedFilter,
            aggregationFunction
          )
        );

        if (selectedFilter.dataScopeType === 'all') {
          this.dispatchWithDi(diContainer, StartFetchDataForSelectedChartAction, { stateNamespace });
        }
      },

      changeSelectedFilterExpressionForSelectedChart: (selectedFilter: SelectedFilter, expression: string) => {
        this.dispatch(
          new ChangeSelectedFilterExpressionForSelectedChartAction(stateNamespace, selectedFilter, expression)
        );

        if (selectedFilter.dataScopeType === 'all') {
          this.dispatchWithDi(diContainer, StartFetchDataForSelectedChartAction, { stateNamespace });
        }
      },

      changeSelectedFilterInputTypeForSelectedChart: (
        selectedFilter: SelectedFilter,
        filterInputType: FilterInputType
      ) => {
        this.dispatch(
          new ChangeSelectedFilterInputTypeForSelectedChartAction(stateNamespace, selectedFilter, filterInputType)
        );

        this.dispatchWithDi(diContainer, StartFetchDataForChangedFilterInSelectedChartAction, {
          selectedFilter,
          stateNamespace
        });
      },

      changeSelectedFilterDataScopeTypeForSelectedChart: (
        selectedFilter: SelectedFilter,
        dataScopeType: DataScopeType
      ) => {
        this.dispatch(
          new ChangeSelectedFilterDataScopeTypeForSelectedChartAction(stateNamespace, selectedFilter, dataScopeType)
        );

        this.dispatchWithDi(diContainer, StartFetchDataForChangedFilterInSelectedChartAction, {
          selectedFilter,
          stateNamespace
        });
      },

      removeSelectedFilterFromSelectedChart: (selectedFilter: SelectedFilter) => {
        this.dispatch(new RemoveSelectedFilterFromSelectedChartAction(stateNamespace, selectedFilter));

        if (selectedFilter.dataScopeType === 'all') {
          this.dispatchWithDi(diContainer, StartFetchDataForSelectedChartAction, { stateNamespace });
        }
      },

      toggleShouldShowPageRightPanePermanently: () =>
        this.dispatch(new ToggleShouldShowPagePanePermanentlyAction(stateNamespace, 'rightPane')),

      toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
        selectorWithDefaultActionsStateNamespaces[`${stateNamespace}FilterSelector`]
      ).toggleMaximizeSelector
    };
  }
}

export const controller = new FilterSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
