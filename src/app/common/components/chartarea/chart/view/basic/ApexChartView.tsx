/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { default as ApexChart } from 'react-apexcharts';
import HashValueCalculator from '../../../../../utils/HashValueCalculator';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import type { Chart } from '../../model/state/Chart';
import ApexChartGeneralOptionsFactory from './optionfactories/ApexChartGeneralOptionsFactory';
import ApexChartEventOptionsFactory from './optionfactories/ApexChartEventOptionsFactory';
import ApexChartPlotOptionsFactory from './optionfactories/ApexChartPlotOptionsFactory';
import ApexChartFillOptionsFactory from './optionfactories/ApexChartFillOptionsFactory';
import ApexChartColorOptionsFactory from './optionfactories/ApexChartColorOptionsFactory';
import ApexChartGridOptionsFactory from './optionfactories/ApexChartGridOptionsFactory';
import ApexChartStateOptionsFactory from './optionfactories/ApexChartStateOptionsFactory';
import ApexChartTitleFactory from './optionfactories/ApexChartTitleFactory';
import ApexChartSubtitleFactory from './optionfactories/ApexChartSubtitleFactory';
import ApexChartXAxisOptionsFactory from './optionfactories/ApexChartXAxisOptionsFactory';
import ApexChartLabelsFactory from './optionfactories/ApexChartLabelsFactory';
import ApexChartStrokeFactory from './optionfactories/ApexChartStrokeOptionsFactory';
import ApexChartDataLabelOptionsFactory from './optionfactories/ApexChartDataLabelOptionsFactory';
import ApexChartLegendOptionsFactory from './optionfactories/ApexChartLegendOptionsFactory';
import ApexChartTooltipOptionsFactory from './optionfactories/ApexChartTooltipOptionsFactory';
import ApexChartYAxisOptionsFactory from './optionfactories/ApexChartYAxisOptionsFactory';

type OwnProps = {
  chart: Chart;
  height: number;
  stateNamespace: ChartAreaStateNamespace;
  width: number;
};

type Props = OwnProps;

const ApexChartView = ({ chart, height, width, stateNamespace, ...actions }: Props) => {
  const chartOptions = {
    chart: {
      ...ApexChartGeneralOptionsFactory.createGeneralOptions(chart),
      events: ApexChartEventOptionsFactory.createEventOptions(chart, stateNamespace, actions as any),
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
