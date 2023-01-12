import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import classNames from 'classnames';
import type { ChartAreaPageStateNamespace } from '../../model/state/namespace/ChartAreaPageStateNamespace';
import ChartControllerFactory from '../controller/ChartControllerFactory';
import styles from './ChartView.module.scss';
import type { Chart } from '../model/state/Chart';
import ChartMenuView from '../menu/view/ChartMenuView';
import ChartConfigHintsView from './confighints/ChartConfigHintsView';
import ChartScrollbarView from '../scrollbar/view/ChartScrollbarView';
import DrillUpIconView from '../drillupicon/view/DrillUpIconView';

type OwnProps = {
  chart: Chart;
  height: number;
  isSelectedChart: boolean;
  pageStateNamespace: ChartAreaPageStateNamespace;
  width: number;
};

const mapAppStateToComponentProps = () => ({});

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new ChartControllerFactory(dispatch, pageStateNamespace).createController();

type Controller = ReturnType<typeof createController>;
type Props = OwnProps & Controller;

function ChartView({ chart, height, isSelectedChart, selectChart, pageStateNamespace, width }: Props) {
  const className = classNames(styles.scrollableChart, { [styles.selectedChart]: isSelectedChart });
  const chartView = chart.createChartView(width, height, pageStateNamespace);

  return (
    <div className={className} onClick={() => selectChart(chart)}>
      {chartView}
      <ChartMenuView chart={chart} className={styles.menu} pageStateNamespace={pageStateNamespace} />
      <ChartScrollbarView chart={chart} className={styles.scrollbar} pageStateNamespace={pageStateNamespace} />
      <DrillUpIconView chart={chart} pageStateNamespace={pageStateNamespace} />
      <ChartConfigHintsView chart={chart} />
    </div>
  );
}

export default connect(mapAppStateToComponentProps, createController)(ChartView);
