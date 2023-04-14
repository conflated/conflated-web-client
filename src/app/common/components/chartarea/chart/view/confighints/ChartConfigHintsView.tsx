import React from 'react';
import styles from './ChartConfigHintsView.module.scss';
import type { Chart } from '../../model/state/Chart';

type Props = {
  chart: Chart;
  heightInRows?: number;
  widthInCols?: number;
};

const ChartConfigHintsView: React.FC<Props> = ({ chart, heightInRows, widthInCols }: Props) => {
  const chartConfigHintTitle = chart.getChartConfigHintTitle();
  const chartConfigHintSubtitle = chart.getChartConfigHintSubtitle();
  let chartIcon;

  switch (chart.chartType) {
    case 'column':
      chartIcon = styles.columnChart;
      break;
    case 'bar':
      chartIcon = styles.barChart;
      break;
    case 'area':
      chartIcon = styles.areaChart;
      break;
    case 'rangeArea':
      chartIcon = styles.rangeAreaChart;
      break;
    case 'line':
      chartIcon = styles.lineChart;
      break;
    case 'donut':
      chartIcon = styles.donutChart;
      break;
    case 'pie':
      chartIcon = styles.pieChart;
      break;
    case 'bubble':
      chartIcon = styles.bubbleChart;
      break;
    case 'scatter':
      chartIcon = styles.scatterPlot;
      break;
    case 'candlestick':
      chartIcon = styles.candlestickChart;
      break;
    case 'boxplot':
      chartIcon = styles.boxPlot;
      break;
    case 'radar':
      chartIcon = styles.radarChart;
      break;
    case 'heatmap':
      chartIcon = styles.heatmapChart;
      break;
    case 'datatable':
      chartIcon = styles.dataTableChart;
      break;
    case 'map':
      chartIcon = styles.mapChart;
      break;
    case 'sparkline':
      chartIcon = styles.sparklineChart;
      break;
    default:
      chartIcon = '';
  }

  if (chartConfigHintTitle) {
    return (
      <>
        <div className={styles.uiHintsContainer}>
          {heightInRows && widthInCols && (
            <div className={styles.chartSize}>
              {widthInCols}
              <span className={styles.timesChar}>x</span>
              {heightInRows}
            </div>
          )}
          {(heightInRows === undefined || heightInRows >= 2) && (
            <>
              <div className={styles.chartType}>
                {chartIcon && <div className={chartIcon} />}
                <span className={styles.chartTypeName}>
                  {`${chart.chartType[0].toUpperCase() + chart.chartType.slice(1)} Chart`}
                </span>
              </div>
              <div className={styles.uiHints}>{chartConfigHintTitle}</div>
              {chartConfigHintSubtitle ? <div className={styles.smallText}>{chartConfigHintSubtitle}</div> : undefined}
            </>
          )}
        </div>
        <div className={styles.chartId}>{`${chart.id}.`}</div>
      </>
    );
  }

  return null;
};

ChartConfigHintsView.defaultProps = {
  heightInRows: undefined,
  widthInCols: undefined
};

export default ChartConfigHintsView;
