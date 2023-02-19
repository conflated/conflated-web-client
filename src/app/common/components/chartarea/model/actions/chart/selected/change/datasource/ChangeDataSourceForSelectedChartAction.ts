import _ from 'lodash';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/types/ChartAreaPageStateNamespace';
import type { DataSource } from '../../../../../../../../model/state/datasource/DataSource';
import ChartFactory from '../../../../../../chart/model/state/ChartFactory';

export default class ChangeDataSourceForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly dataSource: DataSource) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, selectedChart } = currentState;

    const newChart = ChartFactory.createChart({
      ...selectedChart.getChartConfiguration(),
      dataSource: this.dataSource,
      selectedMeasures: [],
      selectedDimensions: [],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisScrollPosition: 0,
      selectedDataPointIndex: undefined,
      drillDowns: undefined,
      currentDrillDownSelectedDimension: undefined,
      selectedDataPoints: undefined,
      isExportMenuOpen: false,
      exportMenuCloseTimeoutID: undefined,
      menuConfirmationType: undefined
    });

    const newState = {
      ...currentState,
      charts: [..._.without(charts, selectedChart), newChart],
      selectedChart: newChart
    };

    return newState;
  }
}
