import OOReduxUtils from 'oo-redux-utils2';
import type { ChartAreaState } from './ChartAreaState';
import layout1 from '../../../../../pages/dataexplorer/leftpane/layoutselector/model/state/layouts/layout1';
import AbstractChartAreaAction from '../actions/AbstractChartAreaAction';
import type { ChartAreaStateNamespace } from './types/ChartAreaStateNamespace';
import ChartFactory from '../../chart/model/state/ChartFactory';

export const nullChart = ChartFactory.createChart();

const initialChartAreaState: ChartAreaState = {
  layout: layout1,
  selectedChart: nullChart,
  charts: [nullChart],
  copiedChart: null
};

export default (stateNamespace: ChartAreaStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<ChartAreaState, ChartAreaStateNamespace>(
    initialChartAreaState,
    AbstractChartAreaAction,
    stateNamespace
  );
