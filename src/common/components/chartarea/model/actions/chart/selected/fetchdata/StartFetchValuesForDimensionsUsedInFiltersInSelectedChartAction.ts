import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import type { SelectedFilter } from '../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import FinishFetchPartialDataForSelectedChartAction from './FinishFetchPartialDataForSelectedChartAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaDispatchingAction from '../../../AbstractChartAreaDispatchingAction';
import { Column } from '../../../../../chart/model/service/types/Column';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  dispatchAction: DispatchAction;
  stateNamespace: ChartAreaPageStateNamespace;
};

@Inject('chartDataService')
class StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction extends AbstractChartAreaDispatchingAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, dispatchAction, stateNamespace }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.chartDataService = chartDataService;
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    const dimensionColumns: Column[] = selectedChart
      .getSelectedFilters()
      .filter(
        ({ type, filterInputType }: SelectedFilter) =>
          (type === 'dimension' && filterInputType === 'Dropdown filter') ||
          filterInputType === 'Checkboxes filter' ||
          filterInputType === 'Radio buttons filter'
      )
      .map(({ sqlColumn: { name, expression } }: SelectedFilter) => ({
        name,
        expression,
        type: 'dimension'
      }));

    this.chartDataService
      .fetchDimensionValues(selectedChart.dataSource, dimensionColumns)
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatchAction(
          new FinishFetchPartialDataForSelectedChartAction(this.stateNamespace, columnNameToValuesMap)
        )
      );

    selectedChart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction;
