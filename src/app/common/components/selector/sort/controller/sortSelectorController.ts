import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import AddTimeSortToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/sort/AddTimeSortToSelectedChartAction';
import type { SortSelectorStateNamespace } from '../model/state/types/SortSelectorStateNamespace';
import type { TimeSortOption } from '../../../chartarea/chart/model/state/sorts/sort/types/TimeSortOption';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import AddSortToSelectedChartAction from '../../../chartarea/model/actions/chart/selected/add/sort/AddSortToSelectedChartAction';
import ChangeSortAggregationFunctionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/sort/ChangeSortAggregationFunctionForSelectedChartAction';
import type { Sort } from '../../../chartarea/chart/model/state/sorts/sort/Sort';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SortType } from '../../../chartarea/chart/model/state/sorts/sort/types/SortType';
import type { SortDirection } from '../../../chartarea/chart/model/state/sorts/sort/types/SortDirection';
import ChangeSortDirectionForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/sort/ChangeSortDirectionForSelectedChartAction';
import ChangeSortDataScopeTypeForSelectedChartAction from '../../../chartarea/model/actions/chart/selected/change/sort/ChangeSortDataScopeTypeForSelectedChartAction';
import type { DataScope } from '../../../chartarea/chart/model/state/types/DataScope';
import RemoveSortFromSelectedChartAction from '../../../chartarea/model/actions/chart/selected/remove/RemoveSortFromSelectedChartAction';
import type { Chart } from '../../../chartarea/chart/model/state/Chart';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import createShownTimeSortOptionsSelector from './selectors/createShownTimeSortOptionsSelector';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import selectShownMeasures from '../../../../../page/dataexplorer/pane/left/selector/measure/controller/selectors/selectShownMeasures';
import createShownDimensionsSelector from '../../../../../page/dataexplorer/pane/left/selector/dimension/controller/selectors/createShownDimensionsSelector';
import store from '../../../../../../store/store';
import selectorWithActionsStateNamespaces from '../../withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import { controller as selectorWithActionsController } from '../../withtitleactions/controller/selectorWithTitleActionsController';
import { OwnProps } from '../view/SortSelectorView';
import FlashSortsBrieflyAction from '../model/actions/FlashSortsBrieflyAction';

class SortSelectorController extends Controller<PageStateNamespace> {
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

  getActionDispatchers = (stateNamespace: SortSelectorStateNamespace) => ({
    flashSelectedSortBysBriefly: () => {
      this.dispatch(new FlashSortsBrieflyAction(stateNamespace));
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
          new AddTimeSortToSelectedChartAction(
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
      type: SortType,
      sortDirection: SortDirection
    ) => {
      this.dispatch(new AddSortToSelectedChartAction(stateNamespace, dimensionOrMeasure, type, sortDirection));
    },

    changeSelectedSortByAggregationFunctionForSelectedChart: (
      selectedSortBy: Sort,
      aggregationFunction: AggregationFunction
    ) => {
      this.dispatch(
        new ChangeSortAggregationFunctionForSelectedChartAction(stateNamespace, selectedSortBy, aggregationFunction)
      );
    },

    changeSelectedSortBySortDirectionForSelectedChart: (selectedSortBy: Sort, sortDirection: SortDirection) => {
      this.dispatch(new ChangeSortDirectionForSelectedChartAction(stateNamespace, selectedSortBy, sortDirection));
    },

    changeSelectedSortByDataScopeTypeForSelectedChart: (selectedSortBy: Sort, dataScopeType: DataScope) => {
      this.dispatch(new ChangeSortDataScopeTypeForSelectedChartAction(stateNamespace, selectedSortBy, dataScopeType));
    },

    removeSelectedSortByFromSelectedChart: (selectedSortBy: Sort) => {
      this.dispatch(new RemoveSortFromSelectedChartAction(stateNamespace, selectedSortBy));
    },

    toggleMaximizeSelector: selectorWithActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}FilterSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new SortSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
