import moment from 'moment';
import type { ColumnNameToValuesMap } from '../state/data/ColumnNameToValuesMap';
import { ChartDataService } from './ChartDataService';
import type { Column } from '../state/types/Column';
import type { MinMaxMeasureColumn } from '../state/types/MinMaxMeasureColumn';
import type { DataSource } from '../state/datasource/DataSource';
import type { Sort } from '../state/sorts/sort/Sort';
import type { Filter } from '../state/filters/filter/Filter';
import ChartDataImpl from '../state/data/ChartDataImpl';

export default class FakeChartDataService implements ChartDataService {
  private readonly latency = 1000;

  // noinspection JSMethodCanBeStatic
  fetchChartData(
    dataSource: DataSource,
    columns: Column[],
    filters: Filter[],
    sorts: Sort[]
  ): Promise<ColumnNameToValuesMap> {
    return new Promise<ColumnNameToValuesMap>((resolve) => {
      setTimeout(() => {
        const columnNameToValuesMap = {} as ColumnNameToValuesMap;
        const measureColumnCount = columns.filter(({ type }: Column) => type === 'measure').length;

        if (measureColumnCount === 0) {
          resolve({});
          return;
        }

        const hasAllDimension = columns.filter(({ name }: Column) => name === 'All').length > 0;
        const hasErrorCategory = columns.filter(({ name }: Column) => name === '"Error category"').length > 0;
        const hasCellDimension = columns.filter(({ name }: Column) => name === 'Cell').length > 0;
        const hasTimestamp = columns.filter(({ name }: Column) => name === 'Timestamp').length > 0;

        columns
          .filter(({ type }: Column) => type === 'measure')
          .forEach(({ name }: Column) => {
            if (hasAllDimension) {
              columnNameToValuesMap[name] = Array(1)
                .fill(0)
                .map(() => Math.floor(100 * Math.random()));
            } else {
              let size = 20;
              if (hasCellDimension && hasTimestamp) {
                size = 200;

                columnNameToValuesMap[name] = Array(size)
                  .fill(0)
                  .map((_, index) => Math.floor(100 - 0.4 * index - 5 * Math.random()));

                return;
              } else if (hasErrorCategory && !hasCellDimension) {
                size = 4;
              } else if (hasErrorCategory && hasCellDimension) {
                size = 20 * 4;
              }

              columnNameToValuesMap[name] = Array(size)
                .fill(0)
                .map(() => Math.floor(name.includes('%') ? 100 * Math.random() : 10000 * Math.random()));
            }
          });

        columns
          .filter(({ name }: Column) => name.includes('Throughput'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [
              50, 55, 60, 55, 60, 70, 65, 60, 62, 58, 50, 55, 60, 55, 60, 70, 65, 60, 62, 58
            ];
          });

        columns
          .filter(({ name }: Column) => name.includes('Throughput lower bound'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [
              49, 52, 55, 51, 52, 60, 62, 59, 55, 54, 48, 52, 57, 55, 50, 62, 60, 55, 59, 52
            ];
          });

        columns
          .filter(({ name }: Column) => name.includes('Throughput upper bound'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [
              55, 60, 62, 60, 62, 74, 69, 62, 64, 60, 59, 60, 63, 60, 64, 72, 69, 63, 65, 60
            ];
          });

        columns
          .filter(({ type }: Column) => type === 'dimension')
          .forEach(({ name }: Column) => {
            if (hasCellDimension && hasTimestamp) {
              columnNameToValuesMap[name] = [];
              for (let index = 0; index < 20; index++) {
                const dimensionValuesForIndex = Array(10)
                  .fill(0)
                  .map(() => (1000 + index).toString());
                columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValuesForIndex];
              }
            } else if (hasCellDimension && hasErrorCategory) {
              columnNameToValuesMap[name] = [];
              for (let index = 0; index < 20; index++) {
                const dimensionValuesForIndex = Array(4)
                  .fill(0)
                  .map(() => (1000 + index).toString());
                columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValuesForIndex];
              }
            } else if (hasAllDimension) {
              columnNameToValuesMap[name] = ['All'];
            } else {
              columnNameToValuesMap[name] = Array(20)
                .fill(0)
                .map((value, index) => (1000 + index).toString());
            }
          });

        columns
          .filter(({ name }: Column) => name.includes('eNodeB, Cell'))
          .forEach(({ name }: Column) => {
            if (hasCellDimension && hasTimestamp) {
              columnNameToValuesMap[name] = [];
              for (let index = 0; index < 20; index++) {
                const dimensionValuesForIndex = Array(10)
                  .fill(0)
                  .map(() => String.fromCharCode('A'.charCodeAt(0) + index));
                columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValuesForIndex];
              }
            } else if (hasCellDimension && hasErrorCategory) {
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
                .map(() => `${Math.floor(Math.random() * 1000)}, ${1000 + Math.floor(Math.random() * 10000)}`);
            }
          });

        columns
          .filter(({ name }: Column) => name.includes('Error category'))
          .forEach(({ name }: Column) => {
            if (!hasCellDimension) {
              columnNameToValuesMap[name] = [
                'Normal release',
                'Radio signalling error',
                'Core signalling error',
                'Error'
              ];
            } else {
              columnNameToValuesMap[name] = [];
              for (let i = 0; i < 20; i++) {
                const dimensionValues = ['Normal release', 'Radio signalling error', 'Core signalling error', 'Error'];
                columnNameToValuesMap[name] = [...(columnNameToValuesMap[name] ?? []), ...dimensionValues];
              }
            }
          });

        columns
          .filter(({ name }: Column) => name.includes('Timestamp'))
          .forEach(({ name }: Column) => {
            if (hasCellDimension && hasTimestamp) {
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

        filters
          .filter(({ type }) => type === 'measure')
          .forEach(({ sqlColumn: { name } }) => {
            if (!columnNameToValuesMap[name]) {
              columnNameToValuesMap[name] = Array(20)
                .fill(0)
                .map(() => Math.floor(100 * Math.random()));
            }
          });

        filters
          .filter(({ type }) => type === 'dimension')
          .forEach(({ sqlColumn: { name } }) => {
            if (!columnNameToValuesMap[name]) {
              columnNameToValuesMap[name] = Array(20)
                .fill(0)
                .map((value: number, index: number): string => String.fromCharCode('A'.charCodeAt(0) + index));
            }
          });

        sorts
          .filter(({ type }: Sort) => type === 'measure')
          .forEach(({ sqlColumn: { name } }: Sort) => {
            if (!columnNameToValuesMap[name]) {
              columnNameToValuesMap[name] = Array(20)
                .fill(0)
                .map(() => Math.floor(100 * Math.random()));
            }
          });

        sorts
          .filter(({ type }: Sort) => type === 'dimension')
          .forEach(({ sqlColumn: { name } }: Sort) => {
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
          .filter(({ name }: Column) => name.includes('Latitude'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [
              51.505, 51.501, 51.501, 51.505, 51.505, 51.504, 51.502, 51.502, 51.502, 51.502, 51.508, 51.505, 51.507,
              51.508, 51.504, 51.501, 51.509, 51.503, 51.503, 51.5
            ];
          });

        columns
          .filter(({ name }: Column) => name.includes('Longitude'))
          .forEach(({ name }: Column) => {
            columnNameToValuesMap[name] = [
              -0.009, 0.004, 0.003, 0.006, -0.004, 0.006, -0.002, -0.006, 0.003, -0.003, -0.007, 0.001, 0.003, 0.002,
              -0.004, 0.006, -0.002, -0.006, 0.003, -0.003
            ];
          });

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
        chartData.filter(filters, 'all');
        chartData.sortChartData(sorts, 'all');
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
