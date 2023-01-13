import React from 'react';
import styles from './ChartIcons.module.scss';
import ChartIcon from './charticon/ChartIconView';
import type { ChartType } from '../../../../../../common/components/chartarea/chart/model/state/types/ChartType';

type Props = {
  notifyDragEnd: () => void;
  notifyDragStart: () => void;
  selectChartType: (chartType: ChartType) => void;
  selectedChartType: ChartType;
};

export default function ChartIconsView(props: Props) {
  return (
    <div className={styles.chartIcons}>
      <ChartIcon {...props} chartType="column" iconClassName={styles.columnChartIcon} tooltipText="Column chart" />
      <ChartIcon {...props} chartType="bar" iconClassName={styles.barChartIcon} tooltipText="Bar chart" />
      <ChartIcon {...props} chartType="area" iconClassName={styles.areaChartIcon} tooltipText="Area chart" />
      <ChartIcon {...props} chartType="line" iconClassName={styles.lineChartIcon} tooltipText="Line chart" />
      <ChartIcon
        {...props}
        chartType="donut"
        iconClassName={styles.donutChartIcon}
        tooltipText="Donut or Gauge chart"
      />
      <ChartIcon {...props} chartType="pie" iconClassName={styles.pieChartIcon} tooltipText="Pie chart" />
      <ChartIcon {...props} chartType="bubble" iconClassName={styles.bubbleChartIcon} tooltipText="Bubble chart" />
      <ChartIcon {...props} chartType="scatter" iconClassName={styles.scatterPlotIcon} tooltipText="Scatter plot" />
      <ChartIcon
        {...props}
        chartType="candlestick"
        iconClassName={styles.candlestickChartIcon}
        tooltipText="Candlestick chart"
      />
      <ChartIcon {...props} chartType="boxplot" iconClassName={styles.boxPlotIcon} tooltipText="Box plot" />
      <ChartIcon {...props} chartType="radar" iconClassName={styles.radarChartIcon} tooltipText="Radar chart" />
      <ChartIcon {...props} chartType="heatmap" iconClassName={styles.heatmapIcon} tooltipText="Heatmap" />
      <ChartIcon {...props} chartType="datatable" iconClassName={styles.dataTableIcon} tooltipText="Data table" />
      <ChartIcon {...props} chartType="map" iconClassName={styles.mapIcon} tooltipText="Map" />
      <ChartIcon
        {...props}
        chartType="statistic"
        iconClassName={styles.statisticIcon}
        tooltipText="Statistic"
        content="123"
      />
    </div>
  );
}
