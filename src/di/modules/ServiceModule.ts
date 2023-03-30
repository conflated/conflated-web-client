import { Module } from 'noicejs';
import FakeDataSourceService from '../../app/pages/dataexplorer/leftpane/datasourceselector/model/service/FakeDataSourceService';
import FakeMeasureServiceImpl from '../../app/pages/dataexplorer/leftpane/measureselector/model/service/FakeMeasureService';
import FakeDimensionServiceImpl from '../../app/pages/dataexplorer/leftpane/dimensionselector/model/service/FakeDimensionService';
import FakeChartDataService from '../../app/common/components/chartarea/chart/model/service/FakeChartDataService';
import FakeDashboardGroupsService from '../../app/pages/dashboards/model/service/FakeDashboardGroupsService';
import FakeTriggerDataSourceService from '../../app/common/components/page/triggers/leftpane/triggerdatasourceselector/model/service/FakeTriggerDataSourceService';
import FakeReportTemplateGroupsService from '../../app/pages/reports/model/services/FakeReportTemplateGroupsService';
import FakeAlertChartDataService from '../../app/pages/alerts/chartarea/model/services/FakeAlertChartDataService';
import FakeGoalChartDataService from '../../app/pages/goals/chartarea/model/services/FakeGoalChartDataService';
import CachingChartDataService from '../../app/common/components/chartarea/chart/model/service/CachingChartDataService';

export default class ServiceModule extends Module {
  override async configure() {
    this.bind('dataSourceService').toInstance(new FakeDataSourceService());
    this.bind('measureService').toInstance(new FakeMeasureServiceImpl());
    this.bind('dimensionService').toInstance(new FakeDimensionServiceImpl());
    this.bind('chartDataService').toInstance(new CachingChartDataService(new FakeChartDataService()));
    // this.bind('chartDataService').toInstance(new FakeChartDataService());
    this.bind('dashboardsService').toInstance(new FakeDashboardGroupsService());
    this.bind('reportTemplateGroupsService').toInstance(new FakeReportTemplateGroupsService());
    this.bind('triggerDataSourceService').toInstance(new FakeTriggerDataSourceService());
    this.bind('alertChartDataService').toInstance(new FakeAlertChartDataService());
    this.bind('goalChartDataService').toInstance(new FakeGoalChartDataService());
  }
}
