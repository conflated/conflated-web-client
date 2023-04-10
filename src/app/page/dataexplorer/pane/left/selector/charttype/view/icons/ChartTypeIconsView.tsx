import React from 'react';
import styles from './ChartTypeIcons.module.scss';
import ChartTypeIconView from './ChartTypeIconView';
import type { ChartType } from '../../../../../../../../common/components/chartarea/chart/model/state/types/ChartType';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

type Props = {
  notifyDragEnd: () => void;
  notifyDragStart: () => void;
  selectChartType: (chartType: ChartType) => void;
  selectedChart: Chart;
};

const ChartTypeIconsView = (props: Props) => (
  <div className={styles.chartIcons}>
    <ChartTypeIconView
      {...props}
      chartType="column"
      iconClassName={styles.columnChartIcon}
      tooltipText="Column chart"
    />
    <ChartTypeIconView {...props} chartType="bar" iconClassName={styles.barChartIcon} tooltipText="Bar chart" />
    <ChartTypeIconView {...props} chartType="area" iconClassName={styles.areaChartIcon} tooltipText="Area chart" />
    <ChartTypeIconView
      {...props}
      chartType="rangeArea"
      iconClassName={styles.corridorChartIcon}
      tooltipText="Corridor chart"
    />
    <ChartTypeIconView {...props} chartType="line" iconClassName={styles.lineChartIcon} tooltipText="Line chart" />
    <ChartTypeIconView
      {...props}
      chartType="donut"
      iconClassName={styles.donutChartIcon}
      tooltipText="Donut or Gauge chart"
    />
    <ChartTypeIconView {...props} chartType="pie" iconClassName={styles.pieChartIcon} tooltipText="Pie chart" />
    <ChartTypeIconView
      {...props}
      chartType="bubble"
      iconClassName={styles.bubbleChartIcon}
      tooltipText="Bubble chart"
    />
    <ChartTypeIconView
      {...props}
      chartType="scatter"
      iconClassName={styles.scatterPlotIcon}
      tooltipText="Scatter plot"
    />
    <ChartTypeIconView
      {...props}
      chartType="candlestick"
      iconClassName={styles.candlestickChartIcon}
      tooltipText="Candlestick chart"
    />
    <ChartTypeIconView {...props} chartType="boxplot" iconClassName={styles.boxPlotIcon} tooltipText="Box plot" />
    <ChartTypeIconView {...props} chartType="radar" iconClassName={styles.radarChartIcon} tooltipText="Radar chart" />
    <ChartTypeIconView {...props} chartType="heatmap" iconClassName={styles.heatmapIcon} tooltipText="Heatmap" />
    <ChartTypeIconView {...props} chartType="datatable" iconClassName={styles.dataTableIcon} tooltipText="Data table" />
    <ChartTypeIconView {...props} chartType="map" iconClassName={styles.mapIcon} tooltipText="Map" />
    <ChartTypeIconView
      {...props}
      chartType="sparkline"
      iconClassName={styles.sparklineIcon}
      tooltipText="Statistic + Sparkline"
    />
    <ChartTypeIconView
      {...props}
      chartType="statistic"
      iconClassName={styles.statisticIcon}
      tooltipText="Statistic"
      content="123"
    />
  </div>
);

export default ChartTypeIconsView;
