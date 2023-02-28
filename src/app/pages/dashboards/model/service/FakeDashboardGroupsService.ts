import { DashboardGroupsService } from './DashboardGroupsService';
import layout1 from '../../../dataexplorer/leftpane/layoutselector/model/state/layouts/layout1';
import layout2 from '../../../dataexplorer/leftpane/layoutselector/model/state/layouts/layout2';
import type { DashboardGroup } from '../state/types/DashboardGroup';
import ChartFactory from '../../../../common/components/chartarea/chart/model/state/ChartFactory';
import { ChartConfiguration } from '../../../../common/components/chartarea/chart/model/state/ChartConfiguration';
import emptyDataSource from '../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { Measure } from '../../../dataexplorer/leftpane/measureselector/model/state/types/Measure';
import { Dimension } from '../../../dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import layout4 from '../../../dataexplorer/leftpane/layoutselector/model/state/layouts/layout4';
import layout14 from '../../../dataexplorer/leftpane/layoutselector/model/state/layouts/layout14';

export default class FakeDashboardGroupsService implements DashboardGroupsService {
  private readonly latency = 1000;

  fetchDashboardGroups(): Promise<DashboardGroup[]> {
    const emptyChart = ChartFactory.createChart();

    const chartConfig: ChartConfiguration = {
      id: '1',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
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
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig2: ChartConfiguration = {
      id: '1',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
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
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig3: ChartConfiguration = {
      id: '2',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
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
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig4: ChartConfiguration = {
      id: '3',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
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
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig5: ChartConfiguration = {
      id: '4',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
            expression: ''
          },
          visualizationColor: '#F47F31',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig6: ChartConfiguration = {
      id: '5',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
            expression: ''
          },
          visualizationColor: '#E03DCD',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chartConfig7: ChartConfiguration = {
      id: '6',
      chartType: 'column',
      dataSource: emptyDataSource,
      selectedMeasures: [
        {
          measure: {
            name: 'measure1',
            isDate: false
          } as Measure,
          sqlColumn: {
            name: 'measure1',
            expression: ''
          },
          visualizationColor: '#7D33F2',
          aggregationFunction: 'SUM',
          visualizationType: 'column'
        }
      ],
      selectedDimensions: [
        {
          dimension: {
            name: 'dimension1'
          } as Dimension,
          sqlColumn: {
            name: 'dimension1',
            expression: ''
          },
          visualizationColor: '',
          visualizationType: 'X-axis categories'
        }
      ],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    const chart1 = ChartFactory.createChart(chartConfig);
    const chart2 = ChartFactory.createChart(chartConfig2);
    const chart3 = ChartFactory.createChart(chartConfig3);
    const chart4 = ChartFactory.createChart(chartConfig4);
    const chart5 = ChartFactory.createChart(chartConfig5);
    const chart6 = ChartFactory.createChart(chartConfig6);
    const chart7 = ChartFactory.createChart(chartConfig7);

    return new Promise<DashboardGroup[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Dashboard group 1',
            dashboards: [
              {
                name: 'Dashboard 1.1',
                layout: layout1,
                charts: [chart1]
              },
              {
                name: 'Dashboard 1.2',
                layout: layout1,
                charts: [chart2]
              },
              {
                name: 'Dashboard 1.3',
                layout: layout2,
                charts: [chart1, chart3]
              },
              {
                name: 'Dashboard 1.4',
                layout: layout4,
                charts: [chart1, chart3, chart4]
              },
              {
                name: 'Dashboard 1.5',
                layout: layout14,
                charts: [chart1, chart3, chart4, chart5, chart6, chart7]
              }
            ]
          },
          {
            name: 'Dashboard group 2',
            dashboards: [
              {
                name: 'Dashboard 2.1',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.2',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.3',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.4 very long name here for dashboard xxxyyyyzzz',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.5',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.6',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.7',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.8',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.9',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.10',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.11',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.12',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.13',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.14',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.15',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.16',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.17',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.18',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.19',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.20',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Dashboard 2.21',
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
