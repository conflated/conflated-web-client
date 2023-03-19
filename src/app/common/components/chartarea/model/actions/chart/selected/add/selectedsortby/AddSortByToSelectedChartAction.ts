import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { SelectedSortByType } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/types/SelectedfSortByType';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { SortDirection } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSortByAddedToSelectedChartAction from '../../fetchdata/StartFetchDataForSortByAddedToSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class AddSortByToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly measureOrDimension: Dimension | Measure,
    private readonly type: SelectedSortByType,
    private readonly sortDirection: SortDirection
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSortByAddedToSelectedChartAction, diContainer, {
      stateNamespace: this.stateNamespace
    });

    const { selectedChart } = currentState;
    selectedChart.selectedSortBys.addSelectedSortBy(this.measureOrDimension, this.type, this.sortDirection);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
