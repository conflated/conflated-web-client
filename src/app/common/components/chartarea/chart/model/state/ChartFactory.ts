import type { Chart } from './Chart';
import ColumnChart from './impl/basic/nontimeline/xaxiscategories/mixed/ColumnChart';
import AreaChart from './impl/basic/nontimeline/xaxiscategories/mixed/lineorarea/AreaChart';
import LineChart from './impl/basic/nontimeline/xaxiscategories/mixed/lineorarea/LineChart';
import BubbleChart from './impl/basic/nontimeline/bubbleorscatter/BubbleChart';
import ScatterChart from './impl/basic/nontimeline/bubbleorscatter/ScatterChart';
import CandlestickChart from './impl/basic/timeline/CandlestickChart';
import BoxPlotChart from './impl/basic/nontimeline/xaxiscategories/BoxPlotChart';
import RadarChart from './impl/basic/nontimeline/xaxiscategories/RadarChart';
import HeatmapChart from './impl/basic/nontimeline/xaxiscategories/HeatmapChart';
import DataTableChart from './impl/DataTableChart';
import MapChart from './impl/MapChart';
import SparklineChart from './impl/basic/timeline/SparklineChart';
import type { ChartConfiguration } from './ChartConfiguration';
import BarChart from './impl/basic/nontimeline/xaxiscategories/BarChart';
import PieChartImpl from './impl/basic/nontimeline/pieordonut/PieChartImpl';
import DonutChartImpl from './impl/basic/nontimeline/pieordonut/DonutChartImpl';
import RangeAreaChart from './impl/basic/nontimeline/xaxiscategories/RangeAreaChart';
import StatisticChart from './impl/StatisticChart';

export default class ChartFactory {
  // noinspection OverlyComplexFunctionJS
  static createChart(configuration?: ChartConfiguration): Chart {
    if (!configuration) {
      return new ColumnChart(configuration);
    }

    switch (configuration.type) {
      case 'column':
        return new ColumnChart(configuration);
      case 'bar':
        return new BarChart(configuration);
      case 'area':
        return new AreaChart(configuration);
      case 'rangeArea':
        return new RangeAreaChart(configuration);
      case 'line':
        return new LineChart(configuration);
      case 'donut':
        return new DonutChartImpl(configuration);
      case 'pie':
        return new PieChartImpl(configuration);
      case 'bubble':
        return new BubbleChart(configuration);
      case 'scatter':
        return new ScatterChart(configuration);
      case 'candlestick':
        return new CandlestickChart(configuration);
      case 'boxplot':
      case 'violin':
        return new BoxPlotChart(configuration);
      case 'radar':
        return new RadarChart(configuration);
      case 'heatmap':
        return new HeatmapChart(configuration);
      case 'map':
        return new MapChart(configuration);
      case 'sparkline':
        return new SparklineChart(configuration);
      case 'statistic':
        return new StatisticChart(configuration);
      case 'stepline':
        return new LineChart(configuration);
      case 'alertsdatatable':
      case 'goalsdatatable':
      case 'datatable':
        return new DataTableChart(configuration);
      default:
        throw new Error('Unsupported chart type');
    }
  }
}
