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
import StatisticChart from './impl/basic/timeline/StatisticChart';
import type { ChartConfiguration } from './ChartConfiguration';
import BarChart from './impl/basic/nontimeline/xaxiscategories/BarChart';
import PieChartImpl from './impl/basic/nontimeline/pieordonut/PieChartImpl';
import DonutChartImpl from './impl/basic/nontimeline/pieordonut/DonutChartImpl';
import RangeAreaChart from './impl/basic/nontimeline/xaxiscategories/RangeAreaChart';

export default class ChartFactory {
  // noinspection OverlyComplexFunctionJS
  static createChart(chartConfiguration?: ChartConfiguration): Chart {
    if (!chartConfiguration) {
      return new ColumnChart(chartConfiguration);
    }

    switch (chartConfiguration.chartType) {
      case 'column':
        return new ColumnChart(chartConfiguration);
      case 'bar':
        return new BarChart(chartConfiguration);
      case 'area':
        return new AreaChart(chartConfiguration);
      case 'rangeArea':
        return new RangeAreaChart(chartConfiguration);
      case 'line':
        return new LineChart(chartConfiguration);
      case 'donut':
        return new DonutChartImpl(chartConfiguration);
      case 'pie':
        return new PieChartImpl(chartConfiguration);
      case 'bubble':
        return new BubbleChart(chartConfiguration);
      case 'scatter':
        return new ScatterChart(chartConfiguration);
      case 'candlestick':
        return new CandlestickChart(chartConfiguration);
      case 'boxplot':
      case 'violin':
        return new BoxPlotChart(chartConfiguration);
      case 'radar':
        return new RadarChart(chartConfiguration);
      case 'heatmap':
        return new HeatmapChart(chartConfiguration);
      case 'map':
        return new MapChart(chartConfiguration);
      case 'statistic':
        return new StatisticChart(chartConfiguration);
      case 'stepline':
        return new LineChart(chartConfiguration);
      case 'alertsdatatable':
      case 'goalsdatatable':
      case 'datatable':
        return new DataTableChart(chartConfiguration);
      default:
        throw new Error('Unsupported chart type');
    }
  }
}
