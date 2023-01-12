import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import AbstractChartAreaDispatchingAction from '../../../AbstractChartAreaDispatchingAction';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';
import StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction from './StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction';
import StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction from './StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction';
import type { SelectedFilter } from '../../../../../chart/model/state/selectedfilters/selectedfilter/SelectedFilter';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  dispatchAction: DispatchAction;
  stateNamespace: ChartAreaPageStateNamespace;
  selectedFilter: SelectedFilter;
};

@Inject('chartDataService')
class StartFetchDataForChangedFilterInSelectedChartAction extends AbstractChartAreaDispatchingAction {
  private readonly chartDataService: ChartDataService;

  private readonly selectedFilter: SelectedFilter;

  constructor({ chartDataService, dispatchAction, stateNamespace, selectedFilter }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.chartDataService = chartDataService;
    this.selectedFilter = selectedFilter;
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
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
          dispatchAction: this.dispatchAction,
          stateNamespace: this.stateNamespace
        }),
        currentState
      );
    }

    return currentState;
  }
}

export default StartFetchDataForChangedFilterInSelectedChartAction;
