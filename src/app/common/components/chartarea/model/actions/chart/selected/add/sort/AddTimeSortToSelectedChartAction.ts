import type { TimeSortOption } from '../../../../../../chart/model/state/sorts/sort/types/TimeSortOption';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import ChartAreaStateFactory from '../../../../../state/utils/ChartAreaStateFactory';
import type { SortDirection } from '../../../../../../chart/model/state/sorts/sort/types/SortDirection';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import StartFetchDataForSortColumnAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForSortColumnAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';
import { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';

export default class AddTimeSortToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly dimension: Dimension | Measure,
    private readonly timeSortOption: TimeSortOption,
    private readonly sortDirection: SortDirection
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSortColumnAddedToSelectedChartAction, diContainer, {
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.sorts.addSelectedSortByTime(this.dimension, this.timeSortOption, this.sortDirection);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
