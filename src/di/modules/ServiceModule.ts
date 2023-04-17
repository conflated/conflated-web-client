import { Module } from 'noicejs';
import FakeDataSourceService from '../../app/page/dataexplorer/pane/left/selector/datasource/model/service/FakeDataSourceService';
import FakeMeasureServiceImpl from '../../app/page/dataexplorer/pane/left/selector/measure/model/service/FakeMeasureService';
import FakeDimensionServiceImpl from '../../app/page/dataexplorer/pane/left/selector/dimension/model/service/FakeDimensionService';
import FakeChartDataService from '../../app/common/components/chartarea/chart/model/service/FakeChartDataService';
import FakeDashboardGroupsService from '../../app/page/dashboards/model/service/FakeDashboardGroupsService';
import FakeTriggerDataSourceService from '../../app/common/components/page/triggers/leftpane/selector/datasource/model/service/FakeTriggerDataSourceService';
import FakeReportTemplateGroupsService from '../../app/page/reports/model/services/FakeReportTemplateGroupsService';
import FakeAlertChartDataService from '../../app/page/alerts/chartarea/model/services/FakeAlertChartDataService';
import FakeGoalChartDataService from '../../app/page/goals/chartarea/model/services/FakeGoalChartDataService';
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
