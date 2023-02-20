import { Module } from 'noicejs';
import FakeDataSourceServiceImpl from '../../app/pages/dataexplorer/leftpane/datasourceselector/model/service/FakeDataSourceServiceImpl';
import FakeMeasureServiceImpl from '../../app/pages/dataexplorer/leftpane/measureselector/model/service/FakeMeasureServiceImpl';
import FakeDimensionServiceImpl from '../../app/pages/dataexplorer/leftpane/dimensionselector/model/service/FakeDimensionServiceImpl';
import FakeChartDataService from '../../app/common/components/chartarea/chart/model/service/FakeChartDataService';
import FakeDashboardGroupsService from '../../app/pages/dashboards/model/service/FakeDashboardGroupsService';
import FakeAlertDataSourceService from '../../app/common/components/triggerspage/leftpane/triggerdatasourceselector/model/service/FakeAlertDataSourceService';
import CachingChartDataService from '../../app/common/components/chartarea/chart/model/service/CachingChartDataService';

export default class ServiceModule extends Module {
  async configure() {
    this.bind('dataSourceService').toInstance(new FakeDataSourceServiceImpl());
    this.bind('measureService').toInstance(new FakeMeasureServiceImpl());
    this.bind('dimensionService').toInstance(new FakeDimensionServiceImpl());
    this.bind('chartDataService').toInstance(new CachingChartDataService(new FakeChartDataService()));
    this.bind('dashboardsService').toInstance(new FakeDashboardGroupsService());
    this.bind('alertDataSourceService').toInstance(new FakeAlertDataSourceService());
  }
}
