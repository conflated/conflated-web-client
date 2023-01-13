import React from 'react';
import { connect } from 'react-redux';
import { statisticGroup } from './StatisticChartView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
import type { Chart } from '../../model/state/Chart';
import { ActionDispatchers, controller } from '../../chartController';

type OwnProps = { chart: Chart; pageStateNamespace: ChartAreaPageStateNamespace };

type Props = OwnProps & ActionDispatchers;

const StatisticChartView = ({ chart, selectChart, pageStateNamespace }: Props) => (
  <div key={chart.id} className={statisticGroup} onClick={() => selectChart(chart)}>
    {chart.createChartView(0, 0, pageStateNamespace)}
  </div>
);

export default connect(controller.getState, (_, { pageStateNamespace }: OwnProps) =>
  controller.getActionDispatchers(pageStateNamespace)
)(StatisticChartView);
