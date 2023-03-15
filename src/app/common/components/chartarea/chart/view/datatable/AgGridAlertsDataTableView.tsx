/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HashValueCalculator from '../../../../../utils/HashValueCalculator';
import type { SelectedDimension } from '../../model/state/selecteddimension/SelectedDimension';
import type { Chart } from '../../model/state/Chart';

type Props = { chart: Chart; height: number; width: number };

const columnWidthWeights = {
  Severity: 0.06,
  'Trigger time': 0.1,
  'Active duration': 0.07,
  'Alert group': 0.15,
  'Alert name': 0.2,
  'Trigger values': 0.15,
  Status: 0.07,
  Assignee: 0.08,
  'Status last modified': 0.12
};

const AgGridAlertsDataTableView = ({ chart, height, width }: Props) => {
  let columnDefs = useMemo(
    () =>
      chart.selectedDimensions.map(
        ({ dimension: { name, isDate, isString, isTimestamp }, sqlColumn }: SelectedDimension): object => {
          let filter = 'agNumberColumnFilter';

          if (isString) {
            filter = 'agTextColumnFilter';
          } else if (isDate || isTimestamp) {
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

          const severityToPriorityValueMap = {
            Critical: 4,
            Major: 3,
            Minor: 2,
            Info: 1
          };

          if (name === 'Severity') {
            (colDef as any).comparator = (severity1: string, severity2: string) =>
              (severityToPriorityValueMap as any)[severity1] - (severityToPriorityValueMap as any)[severity2];
          }

          if (name !== 'Alert name') {
            (colDef as any).cellStyle = () => ({ color: '#aaa' });
          }

          return colDef;
        }
      ),
    [chart.selectedDimensions, width]
  );

  const severityIndicatorColumnDef = useMemo(
    () => ({
      width: 20,
      field: 'Severity',
      cellStyle(params: any): object {
        let color;
        switch (params.value) {
          case 'Critical':
            color = '#E23B3B';
            break;
          case 'Major':
            color = '#F47F31';
            break;
          case 'Minor':
            color = '#F7B737';
            break;
          default:
            color = '#37CC73';
        }
        return { color, backgroundColor: color };
      }
    }),
    []
  );

  columnDefs = [severityIndicatorColumnDef, ...columnDefs];
  const dataRows = chart.chartData.getChartDataAsRows();
  const key = HashValueCalculator.hashObject({ columnDefs, dataRows });

  return (
    <div className="ag-theme-fresh" style={{ height }}>
      <AgGridReact
        key={key}
        columnDefs={columnDefs}
        rowData={dataRows}
        rowSelection="multiple"
        pagination
        enableBrowserTooltips
      />
    </div>
  );
};

export default AgGridAlertsDataTableView;
