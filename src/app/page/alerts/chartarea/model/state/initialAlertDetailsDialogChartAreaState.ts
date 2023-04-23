import Constants from '../../../../../common/Constants';
import ChartFactory from '../../../../../common/components/chartarea/chart/model/state/ChartFactory';
import emptyDataSource from '../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import type { ChartAreaState } from '../../../../../common/components/chartarea/model/state/ChartAreaState';

const dataTableChart = ChartFactory.createChart({
  id: '1',
  type: 'alertsdatatable',
  dataSource: {
    ...emptyDataSource,
    name: 'alertsdata'
  },
  selectedMeasures: [],
  selectedDimensions: [
    {
      dimension: {
        name: 'Severity',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: 'Severity',
        expression: 'Severity'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Number',
        expression: '',
        isTimestamp: false,
        isString: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: 'Number',
        expression: 'Number'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Description',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Description"',
        expression: '"Description"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Data source',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Data source"',
        expression: '"Data source"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Trigger time',
        expression: '',
        isTimestamp: true,
        isString: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Trigger time"',
        expression: '"Trigger time"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Active duration',
        expression: '',
        isTimestamp: false,
        isString: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Active duration"',
        expression: '"Active duration"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Labels',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Labels"',
        expression: '"Labels"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Trigger values',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Trigger values"',
        expression: '"Trigger values"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Assignee',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: 'Assignee',
        expression: 'Assignee'
      },
      visualizationType: 'none'
    }
  ],
  filters: [],
  sorts: [],
  data: {},
  xAxisCategoriesShownCount: 0,
  fetchedRowCount: 0
});

const timelineChart = ChartFactory.createChart({
  id: '2',
  type: 'stepline',
  dataSource: {
    ...emptyDataSource,
    name: 'alertstatistics'
  },
  selectedMeasures: [
    {
      aggregationFunction: 'COUNT',
      measure: {
        name: 'Alert Count',
        expression: '',
        isString: false,
        isTimestamp: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Trigger time COUNT"',
        expression: 'COUNT("Trigger time")'
      },
      visualizationType: 'line',
      visualizationColor: ''
    }
  ],
  selectedDimensions: [
    {
      dimension: {
        name: 'Trigger time',
        expression: '',
        isTimestamp: true,
        isString: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Trigger time"',
        expression: '"Trigger time"'
      },
      visualizationType: 'X-axis categories'
    }
  ],
  filters: [],
  sorts: [],
  data: {},
  xAxisCategoriesShownCount: 10,
  fetchedRowCount: 1000
});

const initialAlertDetailsDialogChartAreaState: ChartAreaState = {
  layout: [
    {
      i: '1',
      x: 0,
      y: 0,
      w: Constants.GRID_COLUMN_COUNT,
      h: Constants.GRID_ROW_COUNT / 2
    },
    {
      i: '2',
      x: 0,
      y: Constants.GRID_ROW_COUNT / 2,
      w: Constants.GRID_COLUMN_COUNT,
      h: Constants.GRID_ROW_COUNT / 2
    }
  ],
  charts: [dataTableChart, timelineChart],
  maximizedChart: null,
  selectedChart: dataTableChart
};

export default initialAlertDetailsDialogChartAreaState;
