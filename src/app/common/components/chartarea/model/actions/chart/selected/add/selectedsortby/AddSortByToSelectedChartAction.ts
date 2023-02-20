import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { SelectedSortByType } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/types/SelectedfSortByType';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';
import type { SortDirection } from '../../../../../../chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';

export default class AddSortByToSelectedChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaPageStateNamespace,
    private readonly measureOrDimension: Dimension | Measure,
    private readonly type: SelectedSortByType,
    private readonly sortDirection: SortDirection
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.selectedSortBys.addSelectedSortBy(this.measureOrDimension, this.type, this.sortDirection);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
