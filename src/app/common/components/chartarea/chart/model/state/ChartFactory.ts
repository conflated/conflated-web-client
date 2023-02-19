import type { Chart } from './Chart';
import ColumnChartImpl from './impl/basic/nontimeline/xaxis/mixed/column/ColumnChartImpl';
import AreaChartImpl from './impl/basic/nontimeline/xaxis/mixed/lineorarea/area/AreaChartImpl';
import PieOrDonutChartImpl from './impl/basic/nontimeline/nonxaxis/pieordonut/PieOrDonutChartImpl';
import LineChartImpl from './impl/basic/nontimeline/xaxis/mixed/lineorarea/line/LineChartImpl';
import BubbleChartImpl from './impl/basic/nontimeline/nonxaxis/datapoints/bubble/BubbleChartImpl';
import ScatterChartImpl from './impl/basic/nontimeline/nonxaxis/datapoints/scatter/ScatterChartImpl';
import CandlestickChart from './impl/basic/timeline/CandlestickChart';
import BoxPlotOrViolinChartImpl from './impl/basic/nontimeline/xaxis/boxplotorviolin/BoxPlotOrViolinChartImpl';
import RadarChartImpl from './impl/basic/nontimeline/xaxis/radar/RadarChartImpl';
import HeatmapChartImpl from './impl/basic/nontimeline/xaxis/heatmap/HeatmapChartImpl';
import DataTableChart from './impl/DataTableChart';
import MapChart from './impl/MapChart';
import StatisticChart from './impl/basic/timeline/StatisticChart';
import type { ChartConfiguration } from './ChartConfiguration';
import BarChartImpl from './impl/basic/nontimeline/xaxis/bar/BarChartImpl';

export default class ChartFactory {
  // noinspection OverlyComplexFunctionJS
  static createChart(chartConfiguration?: ChartConfiguration): Chart {
    if (!chartConfiguration) {
      return new ColumnChartImpl(chartConfiguration);
    }

    switch (chartConfiguration.chartType) {
      case 'column':
        return new ColumnChartImpl(chartConfiguration);
      case 'bar':
        return new BarChartImpl(chartConfiguration);
      case 'area':
        return new AreaChartImpl(chartConfiguration);
      case 'line':
        return new LineChartImpl(chartConfiguration);
      case 'donut':
      case 'pie':
        return new PieOrDonutChartImpl(chartConfiguration);
      case 'bubble':
        return new BubbleChartImpl(chartConfiguration);
      case 'scatter':
        return new ScatterChartImpl(chartConfiguration);
      case 'candlestick':
        return new CandlestickChart(chartConfiguration);
      case 'boxplot':
      case 'violin':
        return new BoxPlotOrViolinChartImpl(chartConfiguration);
      case 'radar':
        return new RadarChartImpl(chartConfiguration);
      case 'heatmap':
        return new HeatmapChartImpl(chartConfiguration);
      case 'map':
        return new MapChart(chartConfiguration);
      case 'statistic':
        return new StatisticChart(chartConfiguration);
      case 'alertsdatatable':
      case 'goalsdatatable':
      case 'datatable':
        return new DataTableChart(chartConfiguration);
      default:
        throw new Error('Unsupported chart type');
    }
  }
}
