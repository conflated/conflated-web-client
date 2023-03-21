import moment from 'moment';
import type { ColumnNameToValuesMap } from '../state/chartdata/ColumnNameToValuesMap';
import { ChartDataService } from './ChartDataService';
import type { Column } from '../state/types/Column';
import type { MinMaxMeasureColumn } from '../state/types/MinMaxMeasureColumn';
import type { SelectedFilterConfiguration } from '../state/selectedfilters/selectedfilter/SelectedFilterConfiguration';
import type { DataSource } from '../state/datasource/DataSource';
import type { SelectedSortBy } from '../state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { SelectedFilter } from '../state/selectedfilters/selectedfilter/SelectedFilter';
import ChartDataImpl from '../state/chartdata/ChartDataImpl';

export default class FakeChartDataService implements ChartDataService {
  private readonly latency = 1000;

  // noinspection JSMethodCanBeStatic
  fetchChartData(
    dataSource: DataSource,
    columns: Column[],
    selectedFilters: SelectedFilter[],
    selectedSortBys: SelectedSortBy[]
  ): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;

        if (dataSource.name === 'alertsdata') {
          columnNameToValuesMap.Severity = ['Critical', 'Critical', 'Major', 'Major', 'Minor', 'Info'];
          columnNameToValuesMap['"Trigger time"'] = [
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00'
          ];
          columnNameToValuesMap['"Active duration"'] = ['3 hours', '3 hours', '3 hours', '3 hours', '3 hours', ''];
          columnNameToValuesMap['"Labels"'] = [
            '5G RAN, gNB 2345, Error: Signalling Congestion',
            '5G RAN, gNB 2345',
            '5G RAN, gNB 2366, Error: Signalling Congestion',
            'Label very long name very long name long long',
            '4G RAN, eNB 4333',
            'Core Network, AMF 3'
          ];
          columnNameToValuesMap['"Description"'] = [
            'Very High gNB Setup Failure Rate',
            'High gNB Drop Call Rate',
            'High gNB Setup Failure Rate',
            'Alert description very long name very long name long long',
            'High 5G-4G Handover Failure Rate',
            'Successful Software Upgrade'
          ];
          columnNameToValuesMap['"Data source"'] = [
            'Active CNI Alerts',
            'Active CNI Alerts',
            'Active CNI Alerts',
            'Active FNI Alerts',
            'Active CNI Alerts',
            'Active CNI Alerts'
          ];
          columnNameToValuesMap['"Trigger values"'] = [
            'Setup Failure Rate: 18%',
            'Drop Call Rate: 11%',
            'Setup Failure Rate: 12%',
            'Measure1: 45.76',
            'Handover Failure Rate: 25%',
            ''
          ];
          columnNameToValuesMap.Status = ['New', 'New', 'New', 'New', 'New', ''];
          columnNameToValuesMap.Assignee = ['', '', '', '', '', ''];
          columnNameToValuesMap['"Status last modified"'] = [
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            ''
          ];
        } else if (dataSource.name === 'goalsdata') {
          columnNameToValuesMap.Status = ['Above target', 'On target', 'Below target', 'Far below target'];
          columnNameToValuesMap['"Trigger time"'] = [
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00',
            '2019-04-01 12:00:00'
          ];
          columnNameToValuesMap['"Labels"'] = [
            'RAN, 5G RAN, Southern, TRE Area',
            'RAN, 5G RAN, Southern, TRE Area',
            'RAN, 5G RAN, Southern, TRE Area',
            'RAN, 5G RAN, Southern, TRE Area'
          ];
          columnNameToValuesMap['"Description"'] = [
            'TRE Average 5G RAN Throughput At Least 80 Mb/s',
            'TRE 5G RAN Failure Ratio Lower Than 1%',
            'TRE 5G RAN Coverage Greater Than 75%',
            'TRE Average 5G RAN Latency Lower Than 5 ms'
          ];
          columnNameToValuesMap['"Data source"'] = [
            'RAN Goals',
            'RAN Goals',
            'RAN Goals',
            'RAN Goals',
            'RAN Goals',
            'RAN Goals'
          ];
          columnNameToValuesMap['"Trigger values"'] = [
            'Average 5G RAN Throughput: 120.76 Mb/s',
            '5G RAN Failure Ratio: 0.9%',
            '5G RAN Coverage: 68%',
            'Average 5G RAN Latency: 15 ms'
          ];
        } else if (dataSource.name === 'alertstatistics' || dataSource.name === 'goalstatistics') {
          columnNameToValuesMap['"Trigger time COUNT"'] = [1, 0, 3, 0, 1, 0];
          columnNameToValuesMap['"Trigger time"'] = [
            '2019-04-02T12:02:00',
            '2019-04-02T12:02:00',
            '2019-04-02T14:00:00',
            '2019-04-02T14:00:00',
            '2019-04-02T17:10:00',
            '2019-04-02T17:10:00'
          ];
        } else {
          const measureColumnCount = columns.filter(({ type }: Column) => type === 'measure').length;

          if (measureColumnCount === 0) {
            resolve({});
            return;
          }

          const dimensionColumnCount = columns.filter(({ type }: Column) => type === 'dimension').length;
          const hasProductCategory = columns.filter(({ name }: Column) => name === '"Product category"').length > 0;
          const hasDimension1 = columns.filter(({ name }: Column) => name === 'dimension1').length > 0;
          const hasTimestamp = columns.filter(({ name }: Column) => name === 'timestamp').length > 0;

          columns
            .filter(({ name }: Column) => name.includes('measure'))
            .forEach(({ name }: Column) => {
              if (dimensionColumnCount === 0) {
                columnNameToValuesMap[name] = Array(1)
                  .fill(0)
                  .map(() => Math.floor(100 * Math.random()));
              } else {
                let size = 20;
                if (hasDimension1 && hasTimestamp) {
                  size = 200;
                } else if (hasProductCategory && !hasDimension1) {
                  size = 4;
                } else if (hasProductCategory && hasDimension1) {
                  size = 20 * 4;
                }
                columnNameToValuesMap[name] = Array(size)
                  .fill(0)
                  .map(() => Math.floor(100 * Math.random()));
              }
            });

          columns
            .filter(({ name }: Column) => name.includes('dimension'))
            .forEach(({ name }: Column) => {
              if (hasDimension1 && hasTimestamp) {
                columnNameToValuesMap[name] = [];
                for (let index = 0; index < 20; index++) {
                  const dimensionValuesForIndex = Array(10)
                    .fill(0)
                    .map(() => String.fromCharCode('A'.charCodeAt(0) + index));
                  columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValuesForIndex];
                }
              } else if (hasDimension1 && hasProductCategory) {
                columnNameToValuesMap[name] = [];
                for (let index = 0; index < 20; index++) {
                  const dimensionValuesForIndex = Array(4)
                    .fill(0)
                    .map(() => String.fromCharCode('A'.charCodeAt(0) + index));
                  columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValuesForIndex];
                }
              } else {
                columnNameToValuesMap[name] = Array(20)
                  .fill(0)
                  .map((value: number, index: number): string => String.fromCharCode('A'.charCodeAt(0) + index));
              }
            });

          columns
            .filter(({ name }: Column) => name.includes('Product category'))
            .forEach(({ name }: Column) => {
              if (!hasDimension1) {
                columnNameToValuesMap[name] = ['Desktop computers', 'Mobile phones', 'Monitors', 'Laptops'];
              } else {
                columnNameToValuesMap[name] = [];
                for (let i = 0; i < 20; i++) {
                  const dimensionValues = ['Desktop computers', 'Mobile phones', 'Monitors', 'Laptops'];
                  columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValues];
                }
              }
            });

          columns
            .filter(({ name }: Column) => name.includes('timestamp'))
            .forEach(({ name }: Column) => {
              if (hasDimension1 && hasTimestamp) {
                columnNameToValuesMap[name] = [];
                for (let i = 0; i < 20; i++) {
                  const dimensionValues = Array(10)
                    .fill(0)
                    .map((value: number, index: number) => moment().add(index, 'hours').format('LLL'));
                  columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValues];
                }
              } else {
                columnNameToValuesMap[name] = Array(20)
                  .fill(0)
                  .map((value: number, index: number) => moment().add(index, 'hours').toISOString());
              }
            });

          selectedFilters
            .filter(({ type }: SelectedFilterConfiguration) => type === 'measure')
            .forEach(({ sqlColumn: { name } }: SelectedFilterConfiguration) => {
              if (!columnNameToValuesMap[name]) {
                columnNameToValuesMap[name] = Array(20)
                  .fill(0)
                  .map(() => Math.floor(100 * Math.random()));
              }
            });

          selectedFilters
            .filter(({ type }: SelectedFilterConfiguration) => type === 'dimension')
            .forEach(({ sqlColumn: { name } }: SelectedFilterConfiguration) => {
              if (!columnNameToValuesMap[name]) {
                columnNameToValuesMap[name] = Array(20)
                  .fill(0)
                  .map((value: number, index: number): string => String.fromCharCode('A'.charCodeAt(0) + index));
              }
            });

          selectedSortBys
            .filter(({ type }: SelectedSortBy) => type === 'measure')
            .forEach(({ sqlColumn: { name } }: SelectedSortBy) => {
              if (!columnNameToValuesMap[name]) {
                columnNameToValuesMap[name] = Array(20)
                  .fill(0)
                  .map(() => Math.floor(100 * Math.random()));
              }
            });

          selectedSortBys
            .filter(({ type }: SelectedSortBy) => type === 'dimension')
            .forEach(({ sqlColumn: { name } }: SelectedSortBy) => {
              if (!columnNameToValuesMap[name]) {
                columnNameToValuesMap[name] = Array(20)
                  .fill(0)
                  .map((value: number, index: number): string => String.fromCharCode('A'.charCodeAt(0) + index));
              }
            });

          columns
            .filter(({ name }: Column) => name.includes('eNodeB name'))
            .forEach(({ name }: Column) => {
              columnNameToValuesMap[name] = Array(20)
                .fill(0)
                .map(
                  (value: number, index: number): string =>
                    // eslint-disable-next-line prefer-template
                    'eNodeB ' + String.fromCharCode('A'.charCodeAt(0) + index)
                );
            });

          columns
            .filter(({ name }: Column) => name.includes('latitude'))
            .forEach(({ name }: Column) => {
              columnNameToValuesMap[name] = [
                51.505, 51.501, 51.501, 51.505, 51.505, 51.504, 51.502, 51.502, 51.502, 51.502, 51.508, 51.505, 51.507,
                51.508, 51.504, 51.501, 51.509, 51.503, 51.503, 51.5
              ];
            });

          columns
            .filter(({ name }: Column) => name.includes('longitude'))
            .forEach(({ name }: Column) => {
              columnNameToValuesMap[name] = [
                -0.009, 0.004, 0.003, 0.006, -0.004, 0.006, -0.002, -0.006, 0.003, -0.003, -0.007, 0.001, 0.003, 0.002,
                -0.004, 0.006, -0.002, -0.006, 0.003, -0.003
              ];
            });
        }

        columns
          .filter(({ name }: Column) => name.includes('measure8') || name.includes('measure9'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [];
            for (let index = 0; index < 20; index++) {
              const measureValuesForIndex = Array(50)
                .fill(0)
                .map(() => Math.random() * 100);
              columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...measureValuesForIndex];
            }
          });

        columns
          .filter(({ name }: Column) => name.includes('dimension9'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [];
            for (let index = 0; index < 20; index++) {
              const dimensionValuesForIndex = Array(50)
                .fill(0)
                .map(() => String.fromCharCode('A'.charCodeAt(0) + index));
              columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValuesForIndex];
            }
          });

        const chartData = new ChartDataImpl(columnNameToValuesMap);
        chartData.filterChartData(selectedFilters, 'all');
        chartData.sortChartData(selectedSortBys, 'all');
        resolve(chartData.getColumnNameToValuesMap());
      }, this.latency);
    });
  }

  fetchMinAndMaxValues(dataSource: DataSource, columns: MinMaxMeasureColumn[]): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;

        columns.forEach(({ name }: MinMaxMeasureColumn) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columnNameToValuesMap[`${name}___min___`] = 0 as any;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columnNameToValuesMap[`${name}___max___`] = 101 as any;
        });

        resolve(columnNameToValuesMap);
      }, this.latency);
    });
  }

  fetchDimensionValues(dataSource: DataSource, dimensionColumns: Column[]): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;

        dimensionColumns.forEach(({ name }: Column) => {
          if (!columnNameToValuesMap[`${name}___all___`]) {
            columnNameToValuesMap[`${name}___all___`] = Array(20)
              .fill(0)
              .map((value: number, index: number) => `${name} ${String.fromCharCode('A'.charCodeAt(0) + index)}`);
          }
        });

        resolve(columnNameToValuesMap);
      }, this.latency);
    });
  }
}
