import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import type { ChartAreaPageStateNamespace } from '../../model/state/types/ChartAreaPageStateNamespace';
import styles from './ChartView.module.scss';
import type { Chart } from '../model/state/Chart';
import ChartMenuView from '../menu/view/ChartMenuView';
import ChartConfigHintsView from './confighints/ChartConfigHintsView';
import ChartScrollbarView from '../scrollbar/view/ChartScrollbarView';
import DrillUpIconView from '../drillupicon/view/DrillUpIconView';
import ChartController from '../controller/chartController';
import store from '../../../../../../store/store';

type OwnProps = {
  chart: Chart;
  height: number;
  isSelectedChart: boolean;
  pageStateNamespace: ChartAreaPageStateNamespace;
  width: number;
};

const controller = new ChartController(store.dispatch);
type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;

type Props = OwnProps & ActionDispatchers;

const ChartView = ({ chart, height, isSelectedChart, selectChart, pageStateNamespace, width }: Props) => {
  const className = classNames(styles.scrollableChart, { [styles.selectedChart]: isSelectedChart });
  const chartView = chart.createChartView(width, height, pageStateNamespace, { selectChart });

  return (
    <div className={className} onClick={() => selectChart(chart)}>
      {chartView}
      <ChartMenuView chart={chart} className={styles.menu} pageStateNamespace={pageStateNamespace} />
      <ChartScrollbarView chart={chart} className={styles.scrollbar} pageStateNamespace={pageStateNamespace} />
      <DrillUpIconView chart={chart} pageStateNamespace={pageStateNamespace} />
      <ChartConfigHintsView chart={chart} />
    </div>
  );
};

export default connect(
  null,
  _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
)(ChartView);
