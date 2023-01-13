import { createStore, combineReducers } from 'redux';
import { createNamespacedReducers } from 'oo-redux-utils';
import headerStateReducer from '../app/header/model/state/reducer/headerStateReducer';
import layoutSelectorStateReducer from '../app/pages/dataexplorer/leftpane/layoutselector/model/state/reducer/layoutSelectorStateReducer';
import dataSourceSelectorStateReducer from '../app/pages/dataexplorer/leftpane/datasourceselector/model/state/reducer/dataSourceSelectorStateReducer';
import measureSelectorStateReducer from '../app/pages/dataexplorer/leftpane/measureselector/model/state/reducer/measureSelectorStateReducer';
import dimensionSelectorStateReducer from '../app/pages/dataexplorer/leftpane/dimensionselector/model/state/reducer/dimensionSelectorStateReducer';
import createChartAreaStateReducer from '../app/common/components/chartarea/model/state/reducer/createChartAreaStateReducer';
import dataExplorerSettingsStateReducer from '../app/pages/dataexplorer/settings/state/reducer/dataExplorerSettingsStateReducer';
import saveAsDashboardOrReportTemplateDialogStateReducer from '../app/pages/dataexplorer/saveasdashboardorreporttemplatedialog/model/state/reducer/saveAsDashboardOrReportTemplateDialogStateReducer';
import createSortBySelectorStateReducer from '../app/common/components/sortbyselector/model/state/reducer/createSortBySelectorStateReducer';
import dashboardsPageStateReducer from '../app/pages/dashboards/model/state/reducer/dashboardsPageStateReducer';
import createTriggerDataSourceSelectorStateReducer from '../app/common/components/triggerspage/leftpane/triggerdatasourceselector/model/state/reducer/createTriggerDataSourceSelectorStateReducer';
import createTriggerGroupSelectorStateReducer from '../app/common/components/triggerspage/leftpane/triggergroupselector/model/state/reducer/createTriggerGroupSelectorStateReducer';
import createTriggerSelectorStateReducer from '../app/common/components/triggerspage/leftpane/triggerselector/model/state/reducer/createTriggerSelectorStateReducer';
import createPageStateReducer from '../app/common/components/page/model/state/reducer/createPageStateReducer';
import createSelectorStateReducer from '../app/common/components/selector/model/state/reducer/createSelectorStateReducer';
import selectorStateNamespaces from '../app/common/components/selector/model/state/namespace/SelectorStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../app/common/components/selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import createSelectorWithDefaultActionsStateReducer from '../app/common/components/selectorwithdefaultactions/model/state/reducer/createSelectorWithDefaultActionsStateReducer';
import dashboardsPageHeaderStateReducer from '../app/pages/dashboards/header/model/state/reducer/dashboardsPageHeaderStateReducer';
import createTriggersPageChartAreaStateReducer from '../app/common/components/triggerspage/chartarea/model/state/reducer/createTriggersPageChartAreaStateReducer';
import pageStateNamespaces from '../app/common/components/page/model/state/namespace/PageStateNamespace';

const appStateReducer = combineReducers({
  common: combineReducers({
    selectorStates: combineReducers(createNamespacedReducers(selectorStateNamespaces, createSelectorStateReducer)),
    selectorWithDefaultActionsStates: combineReducers(
      createNamespacedReducers(selectorWithDefaultActionsStateNamespaces, createSelectorWithDefaultActionsStateReducer)
    ),
    pageStates: combineReducers(createNamespacedReducers(pageStateNamespaces, createPageStateReducer))
  }),
  headerState: headerStateReducer,
  dataExplorerPage: combineReducers({
    layoutSelectorState: layoutSelectorStateReducer,
    dataSourceSelectorState: dataSourceSelectorStateReducer,
    measureSelectorState: measureSelectorStateReducer,
    dimensionSelectorState: dimensionSelectorStateReducer,
    chartAreaState: createChartAreaStateReducer('dataExplorerPage'),
    sortBySelectorState: createSortBySelectorStateReducer('dataExplorerPage'),
    settingsState: dataExplorerSettingsStateReducer,
    saveAsDashboardOrReportTemplateDialogState: saveAsDashboardOrReportTemplateDialogStateReducer
  }),
  dashboardsPage: combineReducers({
    dashboardsState: dashboardsPageStateReducer,
    headerState: dashboardsPageHeaderStateReducer,
    chartAreaState: createChartAreaStateReducer('dashboardsPage'),
    sortBySelectorState: createSortBySelectorStateReducer('dashboardsPage')
  }),
  alertsPage: combineReducers({
    triggerDataSourceSelectorState: createTriggerDataSourceSelectorStateReducer('alertsPage'),
    triggerGroupSelectorState: createTriggerGroupSelectorStateReducer('alertsPage'),
    triggerSelectorState: createTriggerSelectorStateReducer('alertsPage'),
    chartAreaState: createTriggersPageChartAreaStateReducer('alertsPage')
  }),
  goalsPage: combineReducers({
    triggerDataSourceSelectorState: createTriggerDataSourceSelectorStateReducer('goalsPage'),
    triggerGroupSelectorState: createTriggerGroupSelectorStateReducer('goalsPage'),
    triggerSelectorState: createTriggerSelectorStateReducer('goalsPage'),
    chartAreaState: createTriggersPageChartAreaStateReducer('goalsPage')
  })
});

// noinspection JSDeprecatedSymbols
export default createStore(appStateReducer);
