import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { statisticGroup } from './StatisticChartView.module.scss';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import type { Chart } from '../../model/state/Chart';
import ChartController from '../../controller/chartController';
import store from '../../../../../../../store/store';

export const controller = new ChartController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
type OwnProps = { chart: Chart; stateNamespace: ChartAreaStateNamespace };

type Props = OwnProps & ActionDispatchers;

const StatisticChartView = ({ chart, selectChart, stateNamespace }: Props) => (
  <div key={chart.id} className={statisticGroup} onClick={() => selectChart(chart)}>
    {chart.createChartView(0, 0, stateNamespace, {})}
  </div>
);

export default connect(
  null,
  _.memoize((__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace))
)(StatisticChartView);
