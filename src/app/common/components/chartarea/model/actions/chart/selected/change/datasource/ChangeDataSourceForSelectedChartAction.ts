import _ from 'lodash';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import type { DataSource } from '../../../../../../chart/model/state/datasource/DataSource';
import ChartFactory from '../../../../../../chart/model/state/ChartFactory';

export default class ChangeDataSourceForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly dataSource: DataSource) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, selectedChart } = currentState;

    const newChart = ChartFactory.createChart({
      ...selectedChart.getConfiguration(),
      dataSource: this.dataSource,
      selectedMeasures: [],
      selectedDimensions: [],
      filters: [],
      sorts: [],
      data: {},
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
