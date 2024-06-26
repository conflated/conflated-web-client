import OOReduxUtils from 'oo-redux-utils2';
import type { ChartAreaState } from './ChartAreaState';
import layout1 from '../../../../../page/dataexplorer/pane/left/selector/layout/model/state/layouts/layout1';
import AbstractChartAreaAction from '../actions/AbstractChartAreaAction';
import type { ChartAreaStateNamespace } from './types/ChartAreaStateNamespace';
import ChartFactory from '../../chart/model/state/ChartFactory';

export const nullChart = ChartFactory.createChart();

const initialChartAreaState: ChartAreaState = {
  layout: layout1,
  selectedChart: nullChart,
  charts: [nullChart],
  copiedChart: null,
  maximizedChart: null,
  isScrollingLayout: false
};

export default (stateNamespace: ChartAreaStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<ChartAreaState, ChartAreaStateNamespace>(
    initialChartAreaState,
    AbstractChartAreaAction,
    stateNamespace
  );
