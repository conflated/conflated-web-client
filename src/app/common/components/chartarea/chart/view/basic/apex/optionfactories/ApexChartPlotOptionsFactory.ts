/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Chart } from '../../../../model/state/Chart';

export default class ApexChartPlotOptionsFactory {
  static createPlotOptions(chart: Chart, width: number, height: number): object {
    const shouldShowRadialBarAsGauge = height < 250;
    let nameFontSize = 15;
    let valueFontSize = 30;
    let nameOffsetY = -7;
    let valueOffsetY = 7;

    if (shouldShowRadialBarAsGauge) {
      if (height > 180) {
        nameFontSize = 14;
        valueFontSize = 25;
        nameOffsetY = -30;
        valueOffsetY = -20;
      } else {
        nameFontSize = 11;
        valueFontSize = 18;
        nameOffsetY = -30;
        valueOffsetY = -25;
      }
    }

    return {
      bar: {
        horizontal: chart.chartType === 'bar'
      },
      candlestick: {
        colors: {
          upward: '#57943a',
          downward: '#dd333f'
        },
        wick: {
          useFillColor: true
        }
      },
      pie: {
        dataLabels: {
          minAngleToShowLabel: 10
        }
      },
      radialBar: {
        size: shouldShowRadialBarAsGauge ? 0.9 * height : 0.5 * Math.min(height, width),
        offsetY: shouldShowRadialBarAsGauge ? 0.2 * height : 0,
        startAngle: shouldShowRadialBarAsGauge ? -90 : 0,
        endAngle: shouldShowRadialBarAsGauge ? 90 : 360,
        track: {
          startAngle: shouldShowRadialBarAsGauge ? -90 : 0,
          endAngle: shouldShowRadialBarAsGauge ? 90 : 360,
          background: '#eeeeee'
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: nameOffsetY,
            show: true,
            color: '#888',
            fontSize: nameFontSize
          },
          value: {
            offsetY: valueOffsetY,
            color: '#111',
            fontSize: valueFontSize,
            show: true
          },
          total: {
            show: chart.selectedMeasures.length > 1,
            label: 'Average',
            formatter: (w: any) =>
              `${(
                w.globals.seriesTotals.reduce(
                  (accumulatedTotal: number, seriesTotal: number) => accumulatedTotal + seriesTotal,
                  0
                ) / w.globals.series.length
              ).toFixed(2)}%`
          }
        }
      }
    };
  }
}
