import { createStore, combineReducers } from 'redux';
import { createNamespacedReducers } from 'oo-redux-utils2';
import headerStateReducer from '../app/header/model/state/headerStateReducer';
import layoutSelectorStateReducer from '../app/pages/dataexplorer/leftpane/layoutselector/model/state/layoutSelectorStateReducer';
import dataSourceSelectorStateReducer from '../app/pages/dataexplorer/leftpane/datasourceselector/model/state/dataSourceSelectorStateReducer';
import measureSelectorStateReducer from '../app/pages/dataexplorer/leftpane/measureselector/model/state/measureSelectorStateReducer';
import dimensionSelectorStateReducer from '../app/pages/dataexplorer/leftpane/dimensionselector/model/state/dimensionSelectorStateReducer';
import createChartAreaStateReducer from '../app/common/components/chartarea/model/state/createChartAreaStateReducer';
import dataExplorerSettingsStateReducer from '../app/pages/dataexplorer/settings/state/dataExplorerSettingsStateReducer';
import saveAsDashboardOrReportTemplateDialogStateReducer from '../app/pages/dataexplorer/saveasdashboardorreporttemplatedialog/model/state/saveAsDashboardOrReportTemplateDialogStateReducer';
import createSortBySelectorStateReducer from '../app/common/components/sortbyselector/model/state/reducer/createSortBySelectorStateReducer';
import dashboardsPageStateReducer from '../app/pages/dashboards/model/state/dashboardsPageStateReducer';
import createTriggerDataSourceSelectorStateReducer from '../app/common/components/triggerspage/leftpane/triggerdatasourceselector/model/state/reducer/createTriggerDataSourceSelectorStateReducer';
import createTriggerGroupSelectorStateReducer from '../app/common/components/triggerspage/leftpane/triggergroupselector/model/state/reducer/createTriggerGroupSelectorStateReducer';
import createTriggerSelectorStateReducer from '../app/common/components/triggerspage/leftpane/triggerselector/model/state/reducer/createTriggerSelectorStateReducer';
import createPageStateReducer from '../app/common/components/page/model/state/reducer/createPageStateReducer';
import createSelectorStateReducer from '../app/common/components/selector/model/state/reducer/createSelectorStateReducer';
import selectorStateNamespaces from '../app/common/components/selector/model/state/namespace/SelectorStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../app/common/components/selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import createSelectorWithDefaultActionsStateReducer from '../app/common/components/selectorwithdefaultactions/model/state/reducer/createSelectorWithDefaultActionsStateReducer';
import dashboardsPageHeaderStateReducer from '../app/pages/dashboards/header/model/state/dashboardsPageHeaderStateReducer';
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
