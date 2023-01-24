import React from 'react';
import styles from './ChartIcons.module.scss';
import ChartIconView from './charticon/ChartIconView';
import type { ChartType } from '../../../../../../common/components/chartarea/chart/model/state/types/ChartType';

type Props = {
  notifyDragEnd: () => void;
  notifyDragStart: () => void;
  selectChartType: (chartType: ChartType) => void;
  selectedChartType: ChartType;
};

const ChartIconsView = (props: Props) => (
  <div className={styles.chartIcons}>
    <ChartIconView {...props} chartType="column" iconClassName={styles.columnChartIcon} tooltipText="Column chart" />
    <ChartIconView {...props} chartType="bar" iconClassName={styles.barChartIcon} tooltipText="Bar chart" />
    <ChartIconView {...props} chartType="area" iconClassName={styles.areaChartIcon} tooltipText="Area chart" />
    <ChartIconView {...props} chartType="line" iconClassName={styles.lineChartIcon} tooltipText="Line chart" />
    <ChartIconView
      {...props}
      chartType="donut"
      iconClassName={styles.donutChartIcon}
      tooltipText="Donut or Gauge chart"
    />
    <ChartIconView {...props} chartType="pie" iconClassName={styles.pieChartIcon} tooltipText="Pie chart" />
    <ChartIconView {...props} chartType="bubble" iconClassName={styles.bubbleChartIcon} tooltipText="Bubble chart" />
    <ChartIconView {...props} chartType="scatter" iconClassName={styles.scatterPlotIcon} tooltipText="Scatter plot" />
    <ChartIconView
      {...props}
      chartType="candlestick"
      iconClassName={styles.candlestickChartIcon}
      tooltipText="Candlestick chart"
    />
    <ChartIconView {...props} chartType="boxplot" iconClassName={styles.boxPlotIcon} tooltipText="Box plot" />
    <ChartIconView {...props} chartType="radar" iconClassName={styles.radarChartIcon} tooltipText="Radar chart" />
    <ChartIconView {...props} chartType="heatmap" iconClassName={styles.heatmapIcon} tooltipText="Heatmap" />
    <ChartIconView {...props} chartType="datatable" iconClassName={styles.dataTableIcon} tooltipText="Data table" />
    <ChartIconView {...props} chartType="map" iconClassName={styles.mapIcon} tooltipText="Map" />
    <ChartIconView
      {...props}
      chartType="statistic"
      iconClassName={styles.statisticIcon}
      tooltipText="Statistic"
      content="123"
    />
  </div>
);

export default ChartIconsView;
