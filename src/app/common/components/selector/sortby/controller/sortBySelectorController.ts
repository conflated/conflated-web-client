import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import AddSortByTimeToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/selectedsortby/AddSortByTimeToSelectedChartAction';
import type { SortBySelectorStateNamespace } from '../model/state/types/SortBySelectorStateNamespace';
import type { TimeSortOption } from '../../../chartarea/chart/model/state/sorts/sort/types/TimeSortOption';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import AddSortByToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/selectedsortby/AddSortByToSelectedChartAction';
import ChangeSelectedSortByAggregationFunctionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByAggregationFunctionForSelectedChartAction';
import type { Sort } from '../../../chartarea/chart/model/state/sorts/sort/Sort';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SelectedSortByType } from '../../../chartarea/chart/model/state/sorts/sort/types/SortType';
import type { SortDirection } from '../../../chartarea/chart/model/state/sorts/sort/types/SortDirection';
import ChangeSelectedSortByDirectionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByDirectionForSelectedChartAction';
import ChangeSelectedSortByDataScopeTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import RemoveSelectedSortByFromSelectedChartAction from '../../../chartarea/model/actions/chart/selected/remove/RemoveSelectedSortByFromSelectedChartAction';
import type { Chart } from '../../../chartarea/chart/model/state/Chart';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import createShownTimeSortOptionsSelector from './selectors/createShownTimeSortOptionsSelector';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import selectShownMeasures from '../../../../../page/dataexplorer/pane/left/selector/measure/controller/selectors/selectShownMeasures';
import createShownDimensionsSelector from '../../../../../page/dataexplorer/pane/left/selector/dimension/controller/selectors/createShownDimensionsSelector';
import store from '../../../../../../store/store';
import selectorWithActionsStateNamespaces from '../../withactions/model/state/types/SelectorWithActionsStateNamespace';
import { controller as selectorWithActionsController } from '../../withactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/SortBySelectorView';
import FlashSelectedSortBysBrieflyAction from '../model/actions/FlashSelectedSortBysBrieflyAction';

class SortBySelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[stateNamespace].sortBySelectorState, {
      selectedChart: appState[stateNamespace].chartAreaState.selectedChart,
      shownDimensions: createShownDimensionsSelector(false)(appState),
      shownMeasures: selectShownMeasures(appState),
      shownTimeSortOptions: createShownTimeSortOptionsSelector(stateNamespace)(appState),

      isFilterSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}FilterSelector`]].isSelectorOpen,

      isDataPointsCountSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}DataPointsCountSelector`]]
          .isSelectorOpen
    });

  getActionDispatchers = (stateNamespace: SortBySelectorStateNamespace) => ({
    flashSelectedSortBysBriefly: () => {
      this.dispatch(new FlashSelectedSortBysBrieflyAction(stateNamespace));
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
      }
    },

    addSortByToSelectedChart: (
      dimensionOrMeasure: Dimension | Measure,
      type: SelectedSortByType,
      sortDirection: SortDirection
    ) => {
      this.dispatch(new AddSortByToSelectedChartAction(stateNamespace, dimensionOrMeasure, type, sortDirection));
    },

    changeSelectedSortByAggregationFunctionForSelectedChart: (
      selectedSortBy: Sort,
      aggregationFunction: AggregationFunction
    ) => {
      this.dispatch(
        new ChangeSelectedSortByAggregationFunctionForSelectedChartAction(
          stateNamespace,
          selectedSortBy,
          aggregationFunction
        )
      );
    },

    changeSelectedSortBySortDirectionForSelectedChart: (selectedSortBy: Sort, sortDirection: SortDirection) => {
      this.dispatch(
        new ChangeSelectedSortByDirectionForSelectedChartAction(stateNamespace, selectedSortBy, sortDirection)
      );
    },

    changeSelectedSortByDataScopeTypeForSelectedChart: (selectedSortBy: Sort, dataScopeType: DataScopeType) => {
      this.dispatch(
        new ChangeSelectedSortByDataScopeTypeForSelectedChartAction(stateNamespace, selectedSortBy, dataScopeType)
      );
    },

    removeSelectedSortByFromSelectedChart: (selectedSortBy: Sort) => {
      this.dispatch(new RemoveSelectedSortByFromSelectedChartAction(stateNamespace, selectedSortBy));
    },

    toggleMaximizeSelector: selectorWithActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}FilterSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new SortBySelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
