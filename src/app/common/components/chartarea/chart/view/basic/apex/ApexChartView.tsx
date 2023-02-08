/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { default as ApexChart } from 'react-apexcharts';
import HashValueCalculator from '../../../../../../model/state/utils/HashValueCalculator';
import type { ChartAreaPageStateNamespace } from '../../../../model/state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../model/state/Chart';
import ApexChartGeneralOptionsFactory from './model/factories/ApexChartGeneralOptionsFactory';
import ApexChartEventOptionsFactory from './model/factories/ApexChartEventOptionsFactory';
import ApexChartPlotOptionsFactory from './model/factories/ApexChartPlotOptionsFactory';
import ApexChartFillOptionsFactory from './model/factories/ApexChartFillOptionsFactory';
import ApexChartColorOptionsFactory from './model/factories/ApexChartColorOptionsFactory';
import ApexChartGridOptionsFactory from './model/factories/ApexChartGridOptionsFactory';
import ApexChartStateOptionsFactory from './model/factories/ApexChartStateOptionsFactory';
import ApexChartTitleFactory from './model/factories/ApexChartTitleFactory';
import ApexChartSubtitleFactory from './model/factories/ApexChartSubtitleFactory';
import ApexChartXAxisOptionsFactory from './model/factories/ApexChartXAxisOptionsFactory';
import ApexChartLabelsFactory from './model/factories/ApexChartLabelsFactory';
import ApexChartStrokeFactory from './model/factories/ApexChartStrokeOptionsFactory';
import ApexChartDataLabelOptionsFactory from './model/factories/ApexChartDataLabelOptionsFactory';
import ApexChartLegendOptionsFactory from './model/factories/ApexChartLegendOptionsFactory';
import ApexChartTooltipOptionsFactory from './model/factories/ApexChartTooltipOptionsFactory';
import ApexChartYAxisOptionsFactory from './model/factories/ApexChartYAxisOptionsFactory';

type OwnProps = {
  chart: Chart;
  height: number;
  pageStateNamespace: ChartAreaPageStateNamespace;
  width: number;
};

type Props = OwnProps;

const ApexChartView = ({ chart, height, width, pageStateNamespace, ...actions }: Props) => {
  const chartOptions = {
    chart: {
      ...ApexChartGeneralOptionsFactory.createGeneralOptions(chart),
      events: ApexChartEventOptionsFactory.createEventOptions(chart, pageStateNamespace, actions as any),
      toolbar: {
        tools: {
          download: false
        }
      }
    },
    plotOptions: ApexChartPlotOptionsFactory.createPlotOptions(chart, width, height),
    fill: ApexChartFillOptionsFactory.createFillOptions(chart),
    colors: ApexChartColorOptionsFactory.createColorOptions(chart),
    grid: ApexChartGridOptionsFactory.createGridOptions(chart),
    states: ApexChartStateOptionsFactory.createStateOptions(),
    title: ApexChartTitleFactory.createTitle(chart),
    subtitle: ApexChartSubtitleFactory.createSubtitle(chart),
    xaxis: ApexChartXAxisOptionsFactory.createXAxisOptions(chart),
    labels: ApexChartLabelsFactory.createLabels(chart),
    stroke: ApexChartStrokeFactory.createStrokeOptions(chart),
    dataLabels: ApexChartDataLabelOptionsFactory.createDataLabelOptions(chart),
    legend: ApexChartLegendOptionsFactory.createLegendOptions(chart),
    tooltip: ApexChartTooltipOptionsFactory.createTooltipOptions(chart),
    yaxis: ApexChartYAxisOptionsFactory.createYAxisOptions(chart)
  };

  const apexChartType = chart.getApexChartType();
  const dataSeries = chart.getApexChartDataSeries((chartOptions.xaxis as any)?.categories ?? []);
  const key = HashValueCalculator.calculateHash({ apexChartType, chartOptions, dataSeries, id: chart.id });

  return (
    <ApexChart
      key={key}
      options={chartOptions as any}
      series={dataSeries}
      type={apexChartType as any}
      width="100%"
      height="100%"
    />
  );
};

export default ApexChartView;
