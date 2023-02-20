import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import AddSortByTimeToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedsortby/AddSortByTimeToSelectedChartAction';
import type { SortBySelectorPageStateNamespace } from '../model/state/types/SortBySelectorPageStateNamespace';
import type { TimeSortOption } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { Dimension } from '../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import AddSortByToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedsortby/AddSortByToSelectedChartAction';
import ChangeSelectedSortByAggregationFunctionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByAggregationFunctionForSelectedChartAction';
import type { SelectedSortBy } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { AggregationFunction } from '../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SelectedSortByType } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SelectedfSortByType';
import type { SortDirection } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import ChangeSelectedSortByDirectionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByDirectionForSelectedChartAction';
import ChangeSelectedSortByDataScopeTypeForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../chartarea/chart/model/state/types/DataScopeType';
import RemoveSelectedSortByFromSelectedChartAction from '../../chartarea/model/actions/chart/selected/remove/RemoveSelectedSortByFromSelectedChartAction';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import ShowSelectedSortBysAction from '../model/actions/ShowSelectedSortBysAction';
import HideSelectedSortBysAction from '../model/actions/HideSelectedSortBysAction';
import StartFetchDataForSortByAddedToSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSortByAddedToSelectedChartAction';
import type { Chart } from '../../chartarea/chart/model/state/Chart';
import { PageStateNamespace } from '../../page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import createShownTimeSortOptionsSelector from './selectors/createShownTimeSortOptionsSelector';
import selectorStateNamespaces from '../../selector/model/state/types/SelectorStateNamespace';
import selectShownMeasures from '../../../../pages/dataexplorer/leftpane/measureselector/controller/selectors/selectShownMeasures';
import createShownDimensionsSelector from '../../../../pages/dataexplorer/leftpane/dimensionselector/controller/selectors/createShownDimensionsSelector';
import store from '../../../../../store/store';
import selectorWithActionsStateNamespaces from '../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import { controller as selectorWithActionsController } from '../../selectorwithactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/SortBySelectorView';

class SortBySelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].sortBySelectorState, {
      selectedChart: appState[pageStateNamespace].chartAreaState.selectedChart,
      shownDimensions: createShownDimensionsSelector(false)(appState),
      shownMeasures: selectShownMeasures(appState),
      shownTimeSortOptions: createShownTimeSortOptionsSelector(pageStateNamespace)(appState),

      isFilterSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}FilterSelector`]].isSelectorOpen,

      isDataPointsCountSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}DataPointsCountSelector`]]
          .isSelectorOpen
    });

  getActionDispatchers = (stateNamespace: SortBySelectorPageStateNamespace) => ({
    flashSelectedSortBysBriefly: () => {
      this.dispatch(new HideSelectedSortBysAction(stateNamespace));
      setTimeout(() => this.dispatch(new ShowSelectedSortBysAction('dataExplorerPage')), 1000);
      setTimeout(() => this.dispatch(new HideSelectedSortBysAction('dataExplorerPage')), 2000);
      setTimeout(() => this.dispatch(new ShowSelectedSortBysAction('dataExplorerPage')), 3000);
    },

    addSortByTimeToSelectedChart: (
      selectedChart: Chart,
      timeSortOption: TimeSortOption,
      sortDirection: SortDirection
    ) => {
      const legendSelectedDimension = selectedChart.getSelectedDimensionOfType('Legend');
      // TODO: must be time legend

      if (legendSelectedDimension) {
        this.dispatch(
          new AddSortByTimeToSelectedChartAction(
            stateNamespace,
            legendSelectedDimension.dimension,
            timeSortOption,
            sortDirection
          )
        );

        this.dispatchWithDi(StartFetchDataForSortByAddedToSelectedChartAction, diContainer, { stateNamespace });
      }
    },

    addSortByToSelectedChart: (
      dimensionOrMeasure: Dimension | Measure,
      type: SelectedSortByType,
      sortDirection: SortDirection
    ) => {
      this.dispatch(new AddSortByToSelectedChartAction(stateNamespace, dimensionOrMeasure, type, sortDirection));
      this.dispatchWithDi(StartFetchDataForSortByAddedToSelectedChartAction, diContainer, { stateNamespace });
    },

    changeSelectedSortByAggregationFunctionForSelectedChart: (
      selectedSortBy: SelectedSortBy,
      aggregationFunction: AggregationFunction
    ) => {
      this.dispatch(
        new ChangeSelectedSortByAggregationFunctionForSelectedChartAction(
          stateNamespace,
          selectedSortBy,
          aggregationFunction
        )
      );

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { stateNamespace });
      }
    },

    changeSelectedSortBySortDirectionForSelectedChart: (
      selectedSortBy: SelectedSortBy,
      sortDirection: SortDirection
    ) => {
      this.dispatch(
        new ChangeSelectedSortByDirectionForSelectedChartAction(stateNamespace, selectedSortBy, sortDirection)
      );

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { stateNamespace });
      }
    },

    changeSelectedSortByDataScopeTypeForSelectedChart: (
      selectedSortBy: SelectedSortBy,
      dataScopeType: DataScopeType
    ) => {
      this.dispatch(
        new ChangeSelectedSortByDataScopeTypeForSelectedChartAction(stateNamespace, selectedSortBy, dataScopeType)
      );

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { stateNamespace });
      }
    },

    removeSelectedSortByFromSelectedChart: (selectedSortBy: SelectedSortBy) => {
      this.dispatch(new RemoveSelectedSortByFromSelectedChartAction(stateNamespace, selectedSortBy));

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { stateNamespace });
      }
    },

    toggleMaximizeSelector: selectorWithActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}FilterSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new SortBySelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
