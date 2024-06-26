/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HashValueCalculator from '../../../../../common/utils/HashValueCalculator';
import type { SelectedDimension } from '../../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import type { Chart } from '../../../../../common/components/chartarea/chart/model/state/Chart';

type Props = { chart: Chart; height: number; width: number };

const statusNameToValueMap = {
  'Far below target': 1,
  'Below target': 2,
  'On target': 3,
  'Above target': 4
};

const AgGridGoalsDataTableChartView = ({ chart, height, width }: Props) => {
  const isMaxWidth1024px = window.matchMedia('screen and (max-width: 1024px)').matches;
  const isMaxWidth480px = window.matchMedia('screen and (max-width: 480px)').matches;
  const pointerIsCoarse = window.matchMedia('screen and (any-pointer: coarse)').matches;
  const isLightModeActive = window.matchMedia('(prefers-color-scheme: light)').matches;

  const columnWidthWeights = useMemo(
    () => ({
      Status: isMaxWidth1024px ? 0 : 0.1,
      'Trigger time': isMaxWidth480px ? 0.5 : 0.1,
      Labels: isMaxWidth480px ? 0.75 : 0.2,
      Description: isMaxWidth480px ? 0.92 : 0.27,
      'Data source': isMaxWidth480px ? 0.5 : 0.13,
      'Trigger values': isMaxWidth480px ? 0.8 : 0.198
    }),
    [isMaxWidth1024px, isMaxWidth480px]
  );

  let columnDefs = useMemo(
    () =>
      chart.selectedDimensions.map(
        ({ dimension: { name, isString, isTimestamp }, sqlColumn }: SelectedDimension): object => {
          let filter = 'agNumberColumnFilter';

          if (name === 'Data source') {
            filter = 'agSetColumnFilter';
          } else if (isString) {
            filter = 'agTextColumnFilter';
          } else if (isTimestamp) {
            filter = 'agDateColumnFilter';
          }

          let finalWidth = width;

          if (width > 480 && width <= 1024) {
            finalWidth = 2 * width;
          }

          const colDef = {
            headerName: name,
            field: sqlColumn.name,
            sortable: true,
            resizable: true,
            tooltipField: name,
            width: (columnWidthWeights as any)[name] * (finalWidth - (isMaxWidth1024px ? 32 : 22)),
            filter,
            floatingFilter: true,
            hide: isMaxWidth1024px && name === 'Status'
          };

          if (name !== 'Description') {
            if (isLightModeActive) {
              (colDef as any).cellStyle = () => ({ color: '#333' });
            } else {
              (colDef as any).cellStyle = () => ({ color: '#aaa' });
            }
          } else if (isLightModeActive) {
            (colDef as any).cellStyle = () => ({ fontWeight: 'bold' });
          }

          if (name === 'Status') {
            (colDef as any).sort = 'asc';

            (colDef as any).comparator = (status1: string, status2: string) =>
              (statusNameToValueMap as any)[status1] - (statusNameToValueMap as any)[status2];

            (colDef as any).cellStyle = (params: any) => {
              let color;

              switch (params.value) {
                case 'Far below target':
                  color = '#E23B3B';
                  break;
                case 'Below target':
                  color = '#F7B737';
                  break;
                case 'On target':
                  color = '#37CC73';
                  break;
                default:
                  color = '#23ABB6';
              }

              return { color, fontWeight: isLightModeActive ? 'bold' : 'normal' };
            };
          }

          return colDef;
        }
      ),
    [chart.selectedDimensions, columnWidthWeights, isLightModeActive, isMaxWidth1024px, width]
  );

  const statusIndicatorColumnDef = useMemo(
    () => ({
      width: isMaxWidth1024px ? 32 : 20,
      field: 'Status',
      sort: isMaxWidth1024px ? 'asc' : undefined,
      sortable: isMaxWidth1024px,
      comparator: (status1: string, status2: string) =>
        (statusNameToValueMap as any)[status1] - (statusNameToValueMap as any)[status2],
      cellStyle(params: any): object {
        let color;
        switch (params.value) {
          case 'Above target':
            color = '#23ABB6';
            break;
          case 'On target':
            color = '#37CC73';
            break;
          case 'Below target':
            color = '#F7B737';
            break;
          case 'Far below target':
            color = '#E23B3B';
            break;
          default:
            color = 'white';
        }
        return { color, backgroundColor: color };
      }
    }),
    [isMaxWidth1024px]
  );

  columnDefs = [statusIndicatorColumnDef, ...columnDefs];
  const dataRows = chart.data.getAsRows();
  const key = HashValueCalculator.hashObject({ columnDefs, dataRows });

  return (
    <div className="ag-theme-balham" style={{ height }}>
      <AgGridReact
        key={key}
        columnDefs={columnDefs}
        rowData={dataRows}
        rowHeight={pointerIsCoarse ? 38 : 19}
        rowSelection="multiple"
        pagination
        enableBrowserTooltips
      />
    </div>
  );
};

export default AgGridGoalsDataTableChartView;
