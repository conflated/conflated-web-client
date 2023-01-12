import OOReduxUtils from 'oo-redux-utils';
import type { ChartAreaState } from '../ChartAreaState';
import layout1 from '../../../../../../dataexplorerpage/leftpane/layoutselector/model/state/layouts/layout1';
import AbstractChartAreaAction from '../../actions/AbstractChartAreaAction';
import type { ChartAreaPageStateNamespace } from '../namespace/ChartAreaPageStateNamespace';
import ChartFactory from '../../../chart/model/state/factory/ChartFactory';
import AbstractChartAreaDispatchingAction from '../../actions/AbstractChartAreaDispatchingAction';

const emptyChart = ChartFactory.createChart();

const initialChartAreaState: ChartAreaState = {
  layout: layout1,
  selectedChart: emptyChart,
  charts: [emptyChart],
  copiedChart: null
};

export default (stateNamespace: ChartAreaPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<ChartAreaState, ChartAreaPageStateNamespace>(
    initialChartAreaState,
    [AbstractChartAreaAction, AbstractChartAreaDispatchingAction],
    stateNamespace
  );
