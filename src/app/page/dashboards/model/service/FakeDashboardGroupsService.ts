import { DashboardGroupsService } from './DashboardGroupsService';
import layout1 from '../../../dataexplorer/pane/left/selector/layout/model/state/layouts/layout1';
import layout2 from '../../../dataexplorer/pane/left/selector/layout/model/state/layouts/layout2';
import type { DashboardGroup } from '../state/types/DashboardGroup';
import ChartFactory from '../../../../common/components/chartarea/chart/model/state/ChartFactory';
import { ChartConfiguration } from '../../../../common/components/chartarea/chart/model/state/ChartConfiguration';
import emptyDataSource from '../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { Measure } from '../../../dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import { Dimension } from '../../../dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import layout4 from '../../../dataexplorer/pane/left/selector/layout/model/state/layouts/layout4';
import layout14 from '../../../dataexplorer/pane/left/selector/layout/model/state/layouts/layout14';

export default class FakeDashboardGroupsService implements DashboardGroupsService {
  private readonly latency = 1000;

  fetchDashboardGroups(): Promise<DashboardGroup[]> {
    const emptyChart = ChartFactory.createChart();

    const chartConfig: ChartConfiguration = {
      id: '1',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Setup Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Setup Failure %',
            expression: ''
          },
          visualizationColor: '#005AFF',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'eNB'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig2: ChartConfiguration = {
      id: '1',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Dropped Call %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Dropped Call %',
            expression: ''
          },
          visualizationColor: '#23ABB6',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig3: ChartConfiguration = {
      id: '2',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Setup Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Setup Failure %',
            expression: ''
          },
          visualizationColor: '#23ABB6',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig4: ChartConfiguration = {
      id: '3',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Dropped Call %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Dropped Call %',
            expression: ''
          },
          visualizationColor: '#F7B737',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'eNB'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig5: ChartConfiguration = {
      id: '4',
      type: 'line',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Dropped Call %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Dropped Call %',
            expression: ''
          },
          visualizationColor: '#F47F31',
          aggregationFunction: 'SUM',
          visualizationType: 'line'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig6: ChartConfiguration = {
      id: '5',
      type: 'area',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Handover Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Handover Failure %',
            expression: ''
          },
          visualizationColor: '#E03DCD',
          aggregationFunction: 'SUM',
          visualizationType: 'area'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'eNB'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig7: ChartConfiguration = {
      id: '6',
      type: 'area',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Handover Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Handover Failure %',
            expression: ''
          },
          visualizationColor: '#7D33F2',
          aggregationFunction: 'SUM',
          visualizationType: 'area'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig8: ChartConfiguration = {
      id: '1',
      type: 'area',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Setup Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Setup Failure %',
            expression: ''
          },
          visualizationColor: '#005AFF',
          aggregationFunction: 'SUM',
          visualizationType: 'area'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'eNB'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 5,
      fetchedRowCount: 5
    };

    const chartConfig9: ChartConfiguration = {
      id: '1',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Setup Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Setup Failure %',
            expression: ''
          },
          visualizationColor: '#005AFF',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'Cell',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        },
        {
          dimension: {
            name: 'Timestamp',
            isTimestamp: true
          } as Dimension,
          sqlColumn: {
            name: 'Timestamp',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'Legend'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 200
    };

    const chartConfig10: ChartConfiguration = {
      id: '2',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Call Drop %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Call Drop %',
            expression: ''
          },
          visualizationColor: '#005AFF',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'Cell',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        },
        {
          dimension: {
            name: 'Timestamp',
            isTimestamp: true
          } as Dimension,
          sqlColumn: {
            name: 'Timestamp',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'Legend'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 200
    };

    const chartConfig11: ChartConfiguration = {
      id: '3',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Handover Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Handover Failure %',
            expression: ''
          },
          visualizationColor: '#005AFF',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'Cell',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        },
        {
          dimension: {
            name: 'Timestamp',
            isTimestamp: true
          } as Dimension,
          sqlColumn: {
            name: 'Timestamp',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'Legend'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 200
    };

    const chartConfig12: ChartConfiguration = {
      id: '1',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Handover Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Handover Failure %',
            expression: ''
          },
          visualizationColor: '#bbb',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'Cell',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        },
        {
          dimension: {
            name: 'Timestamp',
            isTimestamp: true
          } as Dimension,
          sqlColumn: {
            name: 'Timestamp',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'Legend'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 200
    };

    const chartConfig13: ChartConfiguration = {
      id: '2',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Handover Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Handover Failure %',
            expression: ''
          },
          visualizationColor: '#bbb',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'Cell',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        },
        {
          dimension: {
            name: 'Timestamp',
            isTimestamp: true
          } as Dimension,
          sqlColumn: {
            name: 'Timestamp',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'Legend'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 200
    };

    const chartConfig14: ChartConfiguration = {
      id: '3',
      type: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'Handover Failure %',
            isDate: false,
            unit: 'percent'
          } as Measure,
          sqlColumn: {
            name: 'Handover Failure %',
            expression: ''
          },
          visualizationColor: '#bbb',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'Cell'
          } as Dimension,
          sqlColumn: {
            name: 'Cell',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        },
        {
          dimension: {
            name: 'Timestamp',
            isTimestamp: true
          } as Dimension,
          sqlColumn: {
            name: 'Timestamp',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'Legend'
        }
      ],
      filters: [],
      sorts: [],
      data: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 200
    };

    const chart1 = ChartFactory.createChart(chartConfig);
    const chart2 = ChartFactory.createChart(chartConfig2);
    const chart3 = ChartFactory.createChart(chartConfig3);
    const chart4 = ChartFactory.createChart(chartConfig4);
    const chart5 = ChartFactory.createChart(chartConfig5);
    const chart6 = ChartFactory.createChart(chartConfig6);
    const chart7 = ChartFactory.createChart(chartConfig7);
    const chart8 = ChartFactory.createChart(chartConfig8);
    const chart9 = ChartFactory.createChart(chartConfig9);
    const chart10 = ChartFactory.createChart(chartConfig10);
    const chart11 = ChartFactory.createChart(chartConfig11);
    const chart12 = ChartFactory.createChart(chartConfig12);
    const chart13 = ChartFactory.createChart(chartConfig13);
    const chart14 = ChartFactory.createChart(chartConfig14);

    return new Promise<DashboardGroup[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: '5G RAN Monitoring',
            dashboards: [
              {
                name: '5G RAN Traffic',
                layout: layout1,
                charts: [chart1]
              },
              {
                name: '5G RAN Failures',
                layout: layout1,
                charts: [chart2]
              },
              {
                name: '5G RAN Throughput',
                layout: layout2,
                charts: [chart1, chart3]
              },
              {
                name: '5G RAN Mobility',
                layout: layout4,
                charts: [chart1, chart3, chart4]
              },
              {
                name: '5G RAN Coverage',
                layout: layout14,
                charts: [chart1, chart3, chart4, chart5, chart6, chart7]
              }
            ]
          },
          {
            name: 'NOC Wall Screen Dashboards',
            dashboards: [
              {
                name: 'NOC Wall Screen Dashboard 1',
                layout: layout1,
                charts: [chart8]
              },
              {
                name: 'NOC Wall Screen Dashboard 2',
                layout: layout4,
                charts: [chart9, chart10, chart11]
              },
              {
                name: 'NOC Wall Screen Dashboard 3',
                layout: layout4,
                charts: [chart12, chart13, chart14]
              },
              {
                name: 'NOC Wall Screen Dashboard very long name here for dashboard xxxyyyyzzz',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 5',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 6',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 7',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 8',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 9',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 10',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 11',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 12',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 13',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 14',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 15',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 16',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 17',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 18',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 19',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 20',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 21',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'NOC Wall Screen Dashboard 22',
                layout: layout1,
                charts: [emptyChart]
              }
            ]
          }
        ]);
      }, this.latency);
    });
  }
}
