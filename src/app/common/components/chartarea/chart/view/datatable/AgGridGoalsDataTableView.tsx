/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HashValueCalculator from '../../../../../utils/HashValueCalculator';
import type { SelectedDimension } from '../../model/state/selecteddimension/SelectedDimension';
import type { Chart } from '../../model/state/Chart';

type Props = { chart: Chart; height: number; width: number };

const columnWidthWeights = {
  Status: 0.1,
  'Trigger time': 0.12,
  Labels: 0.2,
  Description: 0.3,
  'Trigger values': 0.28
};

const AgGridGoalsDataTableView = ({ chart, height, width }: Props) => {
  let columnDefs = useMemo(
    () =>
      chart.selectedDimensions.map(
        ({ dimension: { name, isString, isTimestamp }, sqlColumn }: SelectedDimension): object => {
          let filter = 'agNumberColumnFilter';

          if (isString) {
            filter = 'agTextColumnFilter';
          } else if (isTimestamp) {
            filter = 'agDateColumnFilter';
          }

          const colDef = {
            headerName: name,
            field: sqlColumn.name,
            sortable: true,
            resizable: true,
            tooltipField: name,
            width: (columnWidthWeights as any)[name] * (width - 22),
            filter
          };

          const statusToPriorityValueMap = {
            'Far below target': 4,
            'Below target': 3,
            'On target': 2,
            'Above target': 1
          };

          if (name !== 'Description') {
            (colDef as any).cellStyle = () => ({ color: '#aaa' });
          }

          if (name === 'Status') {
            (colDef as any).sort = 'asc';

            (colDef as any).comparator = (status1: string, status2: string) =>
              (statusToPriorityValueMap as any)[status1] - (statusToPriorityValueMap as any)[status2];

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

              return { color };
            };
          }

          return colDef;
        }
      ),
    [chart.selectedDimensions, width]
  );

  const statusIndicatorColumnDef = useMemo(
    () => ({
      width: 20,
      field: 'Status',
      cellStyle(params: any): object {
        let color;
        switch (params.value) {
          case 'Above target':
            color = 'teal';
            break;
          case 'On target':
            color = 'green';
            break;
          case 'Below target':
            color = 'yellow';
            break;
          case 'Far below target':
            color = 'red';
            break;
          default:
            color = 'white';
        }
        return { color, backgroundColor: color };
      }
    }),
    []
  );

  columnDefs = [statusIndicatorColumnDef, ...columnDefs];
  const dataRows = chart.chartData.getChartDataAsRows();
  const key = HashValueCalculator.hashObject({ columnDefs, dataRows });

  return (
    <div className="ag-theme-balham" style={{ height }}>
      <AgGridReact
        key={key}
        columnDefs={columnDefs}
        rowData={dataRows}
        rowHeight={19}
        rowSelection="multiple"
        pagination
        enableBrowserTooltips
      />
    </div>
  );
};

export default AgGridGoalsDataTableView;
