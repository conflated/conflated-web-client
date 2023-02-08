import OOReduxUtils from 'oo-redux-utils2';
import type { ChartAreaState } from './ChartAreaState';
import layout1 from '../../../../../pages/dataexplorer/leftpane/layoutselector/model/state/layouts/layout1';
import AbstractChartAreaAction from '../actions/AbstractChartAreaAction';
import type { ChartAreaPageStateNamespace } from './types/ChartAreaPageStateNamespace';
import ChartFactory from '../../chart/model/state/factory/ChartFactory';

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
    AbstractChartAreaAction,
    stateNamespace
  );
