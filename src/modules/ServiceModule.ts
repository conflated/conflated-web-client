import { Module } from 'noicejs';
import { DispatchUtils } from 'oo-redux-utils';
import store from '../store/store';
import FakeDataSourceServiceImpl from '../dataexplorerpage/leftpane/datasourceselector/model/service/FakeDataSourceServiceImpl';
import FakeMeasureServiceImpl from '../dataexplorerpage/leftpane/measureselector/model/service/FakeMeasureServiceImpl';
import FakeDimensionServiceImpl from '../dataexplorerpage/leftpane/dimensionselector/model/service/FakeDimensionServiceImpl';
import FakeChartDataServiceImpl from '../common/components/chartarea/chart/model/service/FakeChartDataServiceImpl';
import FakeDashboardGroupsServiceImpl from '../dashboardspage/model/service/FakeDashboardGroupsServiceImpl';
import FakeAlertDataSourceServiceImpl from '../common/components/triggerspage/leftpane/triggerdatasourceselector/model/service/FakeAlertDataSourceServiceImpl';
import CachingChartDataServiceProxyImpl from '../common/components/chartarea/chart/model/service/CachingChartDataServiceProxyImpl';

export default class ServiceModule extends Module {
  async configure() {
    this.bind('dispatchAction').toInstance(DispatchUtils.createActionDispatcher(store.dispatch));
    this.bind('dataSourceService').toInstance(new FakeDataSourceServiceImpl());
    this.bind('measureService').toInstance(new FakeMeasureServiceImpl());
    this.bind('dimensionService').toInstance(new FakeDimensionServiceImpl());
    this.bind('chartDataService').toInstance(new CachingChartDataServiceProxyImpl(new FakeChartDataServiceImpl()));
    this.bind('dashboardsService').toInstance(new FakeDashboardGroupsServiceImpl());
    this.bind('alertDataSourceService').toInstance(new FakeAlertDataSourceServiceImpl());
  }
}
