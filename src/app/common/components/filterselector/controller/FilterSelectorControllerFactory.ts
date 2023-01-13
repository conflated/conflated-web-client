import { NamespacedControllerFactory } from 'oo-redux-utils';
import AddMeasureFilterToSelectedChartAction from '../../chartarea/model/actions/chart/selected/add/selectedfilter/AddMeasureFilterToSelectedChartAction';
import RemoveSelectedFilterFromSelectedChartAction from '../../chartarea/model/actions/chart/selected/remove/RemoveSelectedFilterFromSelectedChartAction';
import ChangeSelectedFilterAggregationFunctionForSelectedChartAction from '../../chartarea/model/actions/chart/selected/change/selectedfilter/ChangeSelectedFilterAggregationFunctionForSelectedChartAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Dimension } from '../../../../pages/dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { FilterSelectorPageStateNamespace } from '../model/state/namespace/FilterSelectorPageStateNamespace';
import type { Measure } from '../../../../pages/dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
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

export default class FilterSelectorControllerFactory extends NamespacedControllerFactory<FilterSelectorPageStateNamespace> {
  addDimensionFilterToSelectedChart(dimension: Dimension) {
    this.dispatchAction(new AddDimensionFilterToSelectedChartAction(this.stateNamespace, dimension));
    this.dispatchActionWithDi(diContainer, StartFetchDataForFilterAddedToSelectedChartAction, {});
  }

  addMeasureFilterToSelectedChart(measure: Measure) {
    this.dispatchAction(new AddMeasureFilterToSelectedChartAction(this.stateNamespace, measure));
    this.dispatchActionWithDi(diContainer, StartFetchDataForFilterAddedToSelectedChartAction, {});
  }

  changeSelectedFilterAggregationFunctionForSelectedChart(
    selectedFilter: SelectedFilter,
    aggregationFunction: AggregationFunction
  ) {
    this.dispatchAction(
      new ChangeSelectedFilterAggregationFunctionForSelectedChartAction(
        this.stateNamespace,
        selectedFilter,
        aggregationFunction
      )
    );

    if (selectedFilter.dataScopeType === 'all') {
      this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
    }
  }

  changeSelectedFilterExpressionForSelectedChart(selectedFilter: SelectedFilter, expression: string) {
    this.dispatchAction(
      new ChangeSelectedFilterExpressionForSelectedChartAction(this.stateNamespace, selectedFilter, expression)
    );

    if (selectedFilter.dataScopeType === 'all') {
      this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
    }
  }

  changeSelectedFilterInputTypeForSelectedChart(selectedFilter: SelectedFilter, filterInputType: FilterInputType) {
    this.dispatchAction(
      new ChangeSelectedFilterInputTypeForSelectedChartAction(this.stateNamespace, selectedFilter, filterInputType)
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForChangedFilterInSelectedChartAction, {
      selectedFilter
    });
  }

  changeSelectedFilterDataScopeTypeForSelectedChart(selectedFilter: SelectedFilter, dataScopeType: DataScopeType) {
    this.dispatchAction(
      new ChangeSelectedFilterDataScopeTypeForSelectedChartAction(this.stateNamespace, selectedFilter, dataScopeType)
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForChangedFilterInSelectedChartAction, {
      selectedFilter
    });
  }

  removeSelectedFilterFromSelectedChart(selectedFilter: SelectedFilter) {
    this.dispatchAction(new RemoveSelectedFilterFromSelectedChartAction(this.stateNamespace, selectedFilter));

    if (selectedFilter.dataScopeType === 'all') {
      this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {});
    }
  }

  toggleShouldShowPageRightPanePermanently() {
    this.dispatchAction(new ToggleShouldShowPagePanePermanentlyAction(this.stateNamespace, 'rightPane'));
  }

  createController() {
    return {
      addDimensionFilterToSelectedChart: this.addDimensionFilterToSelectedChart,
      addMeasureFilterToSelectedChart: this.addMeasureFilterToSelectedChart,

      changeSelectedFilterAggregationFunctionForSelectedChart:
        this.changeSelectedFilterAggregationFunctionForSelectedChart,

      changeSelectedFilterExpressionForSelectedChart: this.changeSelectedFilterExpressionForSelectedChart,
      changeSelectedFilterInputTypeForSelectedChart: this.changeSelectedFilterInputTypeForSelectedChart,
      changeSelectedFilterDataScopeTypeForSelectedChart: this.changeSelectedFilterDataScopeTypeForSelectedChart,
      removeSelectedFilterFromSelectedChart: this.removeSelectedFilterFromSelectedChart,
      toggleShouldShowPageRightPanePermanently: this.toggleShouldShowPageRightPanePermanently
    };
  }
}
