import React from 'react';
import { connect } from 'react-redux';
import { statisticGroup } from './StatisticChartView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../model/state/Chart';
import ChartController from '../../chartController';
import store from '../../../../../../../store/store';

export const controller = new ChartController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
type OwnProps = { chart: Chart; pageStateNamespace: ChartAreaPageStateNamespace };

type Props = OwnProps & ActionDispatchers;

const StatisticChartView = ({ chart, selectChart, pageStateNamespace }: Props) => (
  <div key={chart.id} className={statisticGroup} onClick={() => selectChart(chart)}>
    {chart.createChartView(0, 0, pageStateNamespace, {})}
  </div>
);

export default connect(null, (_, { pageStateNamespace }: OwnProps) =>
  controller.getActionDispatchers(pageStateNamespace)
)(StatisticChartView);
