import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import HashValueCalculator from '../../../../../../model/state/utils/HashValueCalculator';
import type { SelectedDimension } from '../../../model/state/selecteddimension/SelectedDimension';
import type { SelectedMeasure } from '../../../model/state/selectedmeasure/SelectedMeasure';
import type { Chart } from '../../../model/state/Chart';

type Props = { chart: Chart };

export default function AgGridDataTableView({ chart }: Props) {
  const dimensionColumnDefs = useMemo(
    () =>
      chart.selectedDimensions.map(({ dimension: { name, isString, isTimestamp } }: SelectedDimension): object => {
        let filter = 'agNumberColumnFilter';

        if (isString) {
          filter = 'agTextColumnFilter';
        } else if (isTimestamp) {
          filter = 'agDateColumnFilter';
        }

        return {
          headerName: name,
          field: name,
          sortable: true,
          resizable: true,
          tooltipField: name,
          filter
        };
      }),
    [chart.selectedDimensions]
  );

  const measureColumnDefs = useMemo(
    () =>
      chart.selectedMeasures.map(({ measure: { name } }: SelectedMeasure): object => ({
        headerName: name,
        field: name,
        sortable: true,
        resizable: true,
        tooltipField: name,
        filter: 'agNumberColumnFilter'
      })),
    [chart.selectedMeasures]
  );

  const columnDefs = [...dimensionColumnDefs, ...measureColumnDefs];
  const dataRows = chart.chartData.getChartDataAsRows();
  const key = HashValueCalculator.hashObject({ columnDefs, dataRows });

  return (
    <div key={chart.id} className="ag-theme-fresh">
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
}
