import React from 'react';
import type { Dispatch } from 'oo-redux-utils';
import { connect } from 'react-redux';
import { statisticGroup } from './StatisticChartView.module.scss';
import ChartControllerFactory from '../../controller/ChartControllerFactory';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
import type { Chart } from '../../model/state/Chart';

type OwnProps = { chart: Chart; pageStateNamespace: ChartAreaPageStateNamespace };
const mapAppStateToComponentProps = () => ({});

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new ChartControllerFactory(dispatch, pageStateNamespace).createController();

type Controller = ReturnType<typeof createController>;
type Props = OwnProps & Controller;

function StatisticChartView({ chart, selectChart, pageStateNamespace }: Props): JSX.Element {
  return (
    <div key={chart.id} className={statisticGroup} onClick={() => selectChart(chart)}>
      {chart.createChartView(0, 0, pageStateNamespace)}
    </div>
  );
}

export default connect(mapAppStateToComponentProps, createController)(StatisticChartView);
