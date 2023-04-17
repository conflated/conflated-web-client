import Constants from '../../../../../common/Constants';
import ChartFactory from '../../../../../common/components/chartarea/chart/model/state/ChartFactory';
import emptyDataSource from '../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import type { ChartAreaState } from '../../../../../common/components/chartarea/model/state/ChartAreaState';

const dataTableChart = ChartFactory.createChart({
  id: '1',
  type: 'goalsdatatable',
  dataSource: {
    ...emptyDataSource,
    name: 'goalsdata'
  },
  selectedMeasures: [],
  selectedDimensions: [
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
    }
  ],
  filters: [],
  sorts: [],
  data: {},
  xAxisCategoriesShownCount: 10,
  fetchedRowCount: 1000
});

const timelineChart = ChartFactory.createChart({
  id: '2',
  type: 'stepline',
  dataSource: {
    ...emptyDataSource,
    name: 'goalstatistics'
  },
  selectedMeasures: [
    {
      aggregationFunction: 'COUNT',
      measure: {
        name: 'Goal Count',
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

const initialGoalsPageChartAreaState: ChartAreaState = {
  layout: [
    {
      i: '1',
      x: 0,
      y: 0,
      w: Constants.GRID_COLUMN_COUNT,
      h: (3 * Constants.GRID_ROW_COUNT) / 4
    },
    {
      i: '2',
      x: 0,
      y: (3 * Constants.GRID_ROW_COUNT) / 4,
      w: Constants.GRID_COLUMN_COUNT,
      h: Constants.GRID_ROW_COUNT / 4
    }
  ],
  charts: [dataTableChart, timelineChart],
  selectedChart: dataTableChart,
  maximizedChart: null
};

export default initialGoalsPageChartAreaState;
