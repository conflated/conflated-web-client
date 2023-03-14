import Constants from '../../../../../common/Constants';
import ChartFactory from '../../../../../common/components/chartarea/chart/model/state/ChartFactory';
import emptyDataSource from '../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import type { ChartAreaState } from '../../../../../common/components/chartarea/model/state/ChartAreaState';

const dataTableChart = ChartFactory.createChart({
  id: '1',
  chartType: 'alertsdatatable',
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
        name: 'Alert name',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Alert name"',
        expression: '"Alert name"'
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
        name: 'Alert group',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Alert group"',
        expression: '"Alert group"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Trigger details',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Trigger details"',
        expression: '"Trigger details"'
      },
      visualizationType: 'none'
    },
    {
      dimension: {
        name: 'Status',
        expression: '',
        isTimestamp: false,
        isString: true,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: 'Status',
        expression: 'Status'
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
    },
    {
      dimension: {
        name: 'Status last modified',
        expression: '',
        isTimestamp: true,
        isString: false,
        isDate: false,
        unit: 'none'
      },
      sqlColumn: {
        name: '"Status last modified"',
        expression: '"Status last modified"'
      },
      visualizationType: 'none'
    }
  ],
  selectedFilters: [],
  selectedSortBys: [],
  chartData: {},
  xAxisCategoriesShownCount: 0,
  fetchedRowCount: 0
});

const timelineChart = ChartFactory.createChart({
  id: '2',
  chartType: 'line',
  dataSource: {
    ...emptyDataSource,
    name: 'alertstatistics'
  },
  selectedMeasures: [
    {
      aggregationFunction: 'COUNT',
      measure: {
        name: 'Trigger time',
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
  selectedFilters: [],
  selectedSortBys: [],
  chartData: {},
  xAxisCategoriesShownCount: 10,
  fetchedRowCount: 1000
});

const initialAlertsPageChartAreaState: ChartAreaState = {
  layout: [
    {
      i: '1',
      x: 0,
      y: 0,
      w: Constants.GRID_COLUMN_COUNT,
      h: (2 * Constants.GRID_ROW_COUNT) / 3
    },
    {
      i: '2',
      x: 0,
      y: (2 * Constants.GRID_ROW_COUNT) / 3,
      w: Constants.GRID_COLUMN_COUNT,
      h: Constants.GRID_ROW_COUNT / 3
    }
  ],
  charts: [dataTableChart, timelineChart],
  selectedChart: dataTableChart
};

export default initialAlertsPageChartAreaState;
