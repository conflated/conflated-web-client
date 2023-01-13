import { NamespacedControllerFactory } from 'oo-redux-utils';
import AddSortByTimeToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedsortby/AddSortByTimeToSelectedChartAction';
import type { SortBySelectorPageStateNamespace } from '../model/state/namespace/SortBySelectorPageStateNamespace';
import type { TimeSortOption } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { Dimension } from '../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import AddSortByToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedsortby/AddSortByToSelectedChartAction';
import ChangeSelectedSortByAggregationFunctionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByAggregationFunctionForSelectedChartAction';
import type { SelectedSortBy } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { AggregationFunction } from '../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SelectedSortByType } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SelectedfSortByType';
import type { SortDirection } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import ChangeSelectedSortByDirectionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByDirectionForSelectedChartAction';
import ChangeSelectedSortByDataScopeTypeForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedsortby/ChangeSelectedSortByDataScopeTypeForSelectedChartAction';
import type { DataScopeType } from '../../../model/state/types/DataScopeType';
import RemoveSelectedSortByFromSelectedChartAction from '../../chartarea/model/actions/chart/selected/remove/RemoveSelectedSortByFromSelectedChartAction';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import ShowSelectedSortBysAction from '../model/actions/ShowSelectedSortBysAction';
import HideSelectedSortBysAction from '../model/actions/HideSelectedSortBysAction';
import StartFetchDataForSortByAddedToSelectedChartAction from '../../chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSortByAddedToSelectedChartAction';
import type { Chart } from '../../chartarea/chart/model/state/Chart';

export default class SortBySelectorControllerFactory extends NamespacedControllerFactory<SortBySelectorPageStateNamespace> {
  createController = () => ({
    flashSelectedSortBysBriefly: () => {
      this.dispatchAction(new HideSelectedSortBysAction(this.stateNamespace));
      setTimeout(() => this.dispatchAction(new ShowSelectedSortBysAction('dataExplorerPage')), 1000);
      setTimeout(() => this.dispatchAction(new HideSelectedSortBysAction('dataExplorerPage')), 2000);
      setTimeout(() => this.dispatchAction(new ShowSelectedSortBysAction('dataExplorerPage')), 3000);
    },

    addSortByTimeToSelectedChart: (
      selectedChart: Chart,
      timeSortOption: TimeSortOption,
      sortDirection: SortDirection
    ) => {
      const legendSelectedDimension = selectedChart.getSelectedDimensionOfType('Legend');
      // TODO: must be time legend

      if (legendSelectedDimension) {
        this.dispatchAction(
          new AddSortByTimeToSelectedChartAction(
            this.stateNamespace,
            legendSelectedDimension.dimension,
            timeSortOption,
            sortDirection
          )
        );

        this.dispatchActionWithDi(diContainer, StartFetchDataForSortByAddedToSelectedChartAction, {});
      }
    },

    addSortByToSelectedChart: (
      dimensionOrMeasure: Dimension | Measure,
      type: SelectedSortByType,
      sortDirection: SortDirection
    ) => {
      this.dispatchAction(
        new AddSortByToSelectedChartAction(this.stateNamespace, dimensionOrMeasure, type, sortDirection)
      );

      this.dispatchActionWithDi(diContainer, StartFetchDataForSortByAddedToSelectedChartAction, {});
    },

    changeSelectedSortByAggregationFunctionForSelectedChart: (
      selectedSortBy: SelectedSortBy,
      aggregationFunction: AggregationFunction
    ) => {
      this.dispatchAction(
        new ChangeSelectedSortByAggregationFunctionForSelectedChartAction(
          this.stateNamespace,
          selectedSortBy,
          aggregationFunction
        )
      );

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
      }
    },

    changeSelectedSortBySortDirectionForSelectedChart: (
      selectedSortBy: SelectedSortBy,
      sortDirection: SortDirection
    ) => {
      this.dispatchAction(
        new ChangeSelectedSortByDirectionForSelectedChartAction(this.stateNamespace, selectedSortBy, sortDirection)
      );

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
      }
    },

    changeSelectedSortByDataScopeTypeForSelectedChart: (
      selectedSortBy: SelectedSortBy,
      dataScopeType: DataScopeType
    ) => {
      this.dispatchAction(
        new ChangeSelectedSortByDataScopeTypeForSelectedChartAction(this.stateNamespace, selectedSortBy, dataScopeType)
      );

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
      }
    },

    removeSelectedSortByFromSelectedChart: (selectedSortBy: SelectedSortBy) => {
      this.dispatchAction(new RemoveSelectedSortByFromSelectedChartAction(this.stateNamespace, selectedSortBy));

      if (selectedSortBy.dataScopeType === 'all') {
        this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
      }
    }
  });
}
