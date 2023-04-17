import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';
import StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction from './StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction';
import StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction from './StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction';
import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
  selectedFilter: Filter;
};

@Inject('chartDataService')
class StartFetchDataForChangedFilterInSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  private readonly selectedFilter: Filter;

  constructor({ chartDataService, stateNamespace, selectedFilter }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
    this.selectedFilter = selectedFilter;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    const ActionClass = (() => {
      if (this.selectedFilter.shouldFetchMeasureMinMaxValues(selectedChart.data)) {
        return StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction;
      } else if (this.selectedFilter.shouldFetchChartData(selectedChart.data)) {
        return StartFetchDataForSelectedChartAction;
      } else if (this.selectedFilter.shouldFetchDimensionValues(selectedChart.data)) {
        return StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction;
      }

      return undefined;
    })();

    if (ActionClass) {
      return this.performAction(
        new ActionClass({
          chartDataService: this.chartDataService,
          stateNamespace: this.stateNamespace
        }),
        currentState
      );
    }

    return currentState;
  }
}

export default StartFetchDataForChangedFilterInSelectedChartAction;
