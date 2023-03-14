import layout1 from '../../../dataexplorer/leftpane/layoutselector/model/state/layouts/layout1';
import ChartFactory from '../../../../common/components/chartarea/chart/model/state/ChartFactory';
import { ChartConfiguration } from '../../../../common/components/chartarea/chart/model/state/ChartConfiguration';
import emptyDataSource from '../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { Measure } from '../../../dataexplorer/leftpane/measureselector/model/state/types/Measure';
import { Dimension } from '../../../dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import { ReportTemplateGroupsService } from './ReportTemplateGroupsService';
import { ReportTemplateGroup } from '../state/types/ReportTemplateGroup';
import layout2 from '../../../dataexplorer/leftpane/layoutselector/model/state/layouts/layout2';

export default class FakeReportTemplateGroupsService implements ReportTemplateGroupsService {
  private readonly latency = 1000;

  fetchReportTemplateGroups(): Promise<ReportTemplateGroup[]> {
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

    const chart1 = ChartFactory.createChart(chartConfig);
    const chart3 = ChartFactory.createChart(chartConfig3);

    return new Promise<ReportTemplateGroup[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Subscriber Analysis',
            reportTemplates: [
              {
                name: 'Subscriber Activity',
                layout: layout2,
                charts: [chart1, chart3]
              },
              {
                name: 'Subscriber Failures',
                layout: layout1,
                charts: [chart1]
              },
              {
                name: 'Subscriber Throughput',
                layout: layout1,
                charts: [chart1]
              },
              {
                name: 'Subscriber Mobility',
                layout: layout1,
                charts: [chart1]
              }
            ]
          },
          {
            name: 'RAN Failure Analysis',
            reportTemplates: [
              {
                name: 'gNB Failure Analysis',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'eNB Failure Analysis',
                layout: layout1,
                charts: [emptyChart]
              },
              {
                name: 'Cell Failure Analysis',
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
