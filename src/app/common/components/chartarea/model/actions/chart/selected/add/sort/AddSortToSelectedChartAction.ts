import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { SortType } from '../../../../../../chart/model/state/sorts/sort/types/SortType';
import ChartAreaStateFactory from '../../../../../state/utils/ChartAreaStateFactory';
import type { SortDirection } from '../../../../../../chart/model/state/sorts/sort/types/SortDirection';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSortColumnAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForSortColumnAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddSortToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly measureOrDimension: Dimension | Measure,
    private readonly type: SortType,
    private readonly sortDirection: SortDirection
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSortColumnAddedToSelectedChartAction, diContainer, {
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.sorts.addSort(this.measureOrDimension, this.type, this.sortDirection);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
