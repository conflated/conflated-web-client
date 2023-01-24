/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import 'chartjs-chart-box-and-violin-plot';
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJsChart } from 'chart.js';
import { connect } from 'react-redux';
import styles from './ChartJsChartView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../../model/state/namespace/ChartAreaPageStateNamespace';
import type { Chart } from '../../../model/state/Chart';
import ChartJsChartBaseOptionsFactory from './model/factories/ChartJsChartBaseOptionsFactory';
import { ActionDispatchers, controller } from '../../../chartController';

type OwnProps = {
  chart: Chart;
  pageStateNamespace: ChartAreaPageStateNamespace;
};

type Props = OwnProps & ActionDispatchers;

const ChartJsChartView = ({ chart, pageStateNamespace, ...actions }: Props) => {
  // eslint-disable-next-line react/prefer-exact-props
  const chartCanvasRef: { current: any } = useRef(null);
  const [chartJsChart, setChartJsChart] = useState<ChartJsChart | null>(null);

  useEffect(() => {
    function updateChart() {
      const data = chart.getChartJsDataSetsAndLabels();
      ChartJsChart.defaults.font = { family: 'Arimo' };

      const options = {
        ...ChartJsChartBaseOptionsFactory.createBaseOptions(),
        onClick: (event: any, activeElements: object[]) =>
          chart.handleChartJsClick(event, activeElements, data, pageStateNamespace, actions as any)
      };

      if (chartJsChart) {
        chartJsChart.update();
      } else {
        const context = chartCanvasRef.current.getContext('2d');

        setChartJsChart(
          new ChartJsChart(context, {
            type: chart.chartType as any,
            data: data as any,
            options
          })
        );
      }
    }

    updateChart();
  });

  const chartTitlesClassName = classNames(styles.chartTitles, {
    [styles.drillDownTitles]: (chart.drillDowns ?? []).length > 0
  });

  return (
    <>
      <canvas className={styles.chartCanvas} ref={chartCanvasRef} />
      <div className={chartTitlesClassName}>
        <div className={styles.chartTitle}>{chart.getTitleText()}</div>
        <div className={styles.chartSubtitle}>{chart.getSubtitleText()}</div>
      </div>
    </>
  );
};

export default connect(controller.getState, (_, { pageStateNamespace }: OwnProps) =>
  controller.getActionDispatchers(pageStateNamespace)
)(ChartJsChartView);
