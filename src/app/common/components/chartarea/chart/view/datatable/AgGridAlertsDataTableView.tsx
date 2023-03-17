/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HashValueCalculator from '../../../../../utils/HashValueCalculator';
import type { SelectedDimension } from '../../model/state/selecteddimension/SelectedDimension';
import type { Chart } from '../../model/state/Chart';

type Props = { chart: Chart; height: number; width: number };

const severityToPriorityValueMap = {
  Critical: 4,
  Major: 3,
  Minor: 2,
  Info: 1
};

const AgGridAlertsDataTableView = ({ chart, height, width }: Props) => {
  const isMaxWidth1024px = window.matchMedia && window.matchMedia('screen and (max-width: 1024px)').matches;
  const isMaxWidth480px = window.matchMedia && window.matchMedia('screen and (max-width: 480px)').matches;
  const pointerIsCoarse = window.matchMedia && window.matchMedia('screen and (any-pointer: coarse)').matches;

  const columnWidthWeights = useMemo(
    () => ({
      Severity: isMaxWidth1024px ? 0 : 0.06,
      'Trigger time': isMaxWidth480px ? 0.5 : 0.1,
      'Active duration': isMaxWidth480px ? 0.25 : 0.07,
      Labels: isMaxWidth480px ? 0.75 : 0.15,
      // eslint-disable-next-line no-nested-ternary
      Description: isMaxWidth480px ? 0.75 : isMaxWidth1024px ? 0.26 : 0.2,
      'Trigger values': isMaxWidth480px ? 0.5 : 0.15,
      Status: isMaxWidth480px ? 0.25 : 0.07,
      Assignee: isMaxWidth480px ? 0.3 : 0.08,
      'Status last modified': isMaxWidth480px ? 0.5 : 0.12
    }),
    [isMaxWidth1024px, isMaxWidth480px]
  );

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
            width: (columnWidthWeights as any)[name] * (width - (isMaxWidth1024px ? 32 : 22)),
            filter,
            floatingFilter: true,
            hide: isMaxWidth1024px && name === 'Severity'
          };

          if (name !== 'Description') {
            (colDef as any).cellStyle = () => ({ color: '#aaa' });
          }

          if (name === 'Severity') {
            (colDef as any).sort = 'desc';

            (colDef as any).comparator = (severity1: string, severity2: string) =>
              (severityToPriorityValueMap as any)[severity1] - (severityToPriorityValueMap as any)[severity2];

            (colDef as any).cellStyle = (params: any) => {
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

              return { color };
            };
          }

          return colDef;
        }
      ),
    [chart.selectedDimensions, columnWidthWeights, isMaxWidth1024px, width]
  );

  const severityIndicatorColumnDef = useMemo(
    () => ({
      width: isMaxWidth1024px ? 30 : 20,
      field: 'Severity',
      sort: isMaxWidth1024px ? 'desc' : undefined,
      sortable: isMaxWidth1024px,
      comparator: (severity1: string, severity2: string) =>
        (severityToPriorityValueMap as any)[severity1] - (severityToPriorityValueMap as any)[severity2],
      cellStyle(params: any) {
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
    [isMaxWidth1024px]
  );

  columnDefs = [severityIndicatorColumnDef, ...columnDefs];
  const dataRows = chart.chartData.getChartDataAsRows();
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

export default AgGridAlertsDataTableView;
