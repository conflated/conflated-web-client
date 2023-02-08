import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import type { SelectedFilter } from '../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaDispatchingAction from '../../../AbstractChartAreaDispatchingAction';
import FinishFetchPartialDataForSelectedChartAction from './FinishFetchPartialDataForSelectedChartAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  dispatchAction: DispatchAction;
  stateNamespace: ChartAreaPageStateNamespace;
};

@Inject('chartDataService')
class StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction extends AbstractChartAreaDispatchingAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, dispatchAction, stateNamespace }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    const selectedFilters = selectedChart.getSelectedFilters();

    const minMaxMeasureColumns = selectedFilters
      .filter(({ type, filterInputType }: SelectedFilter) => type === 'measure' && filterInputType === 'Range filter')
      .map(({ dataScopeType, sqlColumn: { name, expression } }: SelectedFilter) => ({
        name,
        expression,
        fetchedRowCount: dataScopeType === 'already fetched' ? selectedChart.fetchedRowCount : 0
      }));

    this.chartDataService
      .fetchMinAndMaxValues(selectedChart.dataSource, minMaxMeasureColumns, [], selectedFilters)
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatchAction(
          new FinishFetchPartialDataForSelectedChartAction(this.stateNamespace, columnNameToValuesMap)
        )
      );

    selectedChart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction;
