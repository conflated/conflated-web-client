import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaPageStateNamespace } from '../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';
import StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction from './StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction';
import StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction from './StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction';
import type { SelectedFilter } from '../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  pageStateNamespace: ChartAreaPageStateNamespace;
  selectedFilter: SelectedFilter;
};

@Inject('chartDataService')
class StartFetchDataForChangedFilterInSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  private readonly selectedFilter: SelectedFilter;

  constructor({ chartDataService, pageStateNamespace, selectedFilter }: ConstructorArgs) {
    super(pageStateNamespace);
    this.chartDataService = chartDataService;
    this.selectedFilter = selectedFilter;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    const ActionClass = (() => {
      if (this.selectedFilter.shouldFetchMeasureMinMaxValues(selectedChart.chartData)) {
        return StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction;
      } else if (this.selectedFilter.shouldFetchChartData(selectedChart.chartData)) {
        return StartFetchDataForSelectedChartAction;
      } else if (this.selectedFilter.shouldFetchDimensionValues(selectedChart.chartData)) {
        return StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction;
      }

      return undefined;
    })();

    if (ActionClass) {
      return this.performAction(
        new ActionClass({
          chartDataService: this.chartDataService,
          pageStateNamespace: this.stateNamespace
        }),
        currentState
      );
    }

    return currentState;
  }
}

export default StartFetchDataForChangedFilterInSelectedChartAction;
