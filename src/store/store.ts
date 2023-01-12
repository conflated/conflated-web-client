import { createStore, combineReducers } from 'redux';
import { createNamespacedReducers } from 'oo-redux-utils';
import headerStateReducer from '../header/model/state/reducer/headerStateReducer';
import layoutSelectorStateReducer from '../dataexplorerpage/leftpane/layoutselector/model/state/reducer/layoutSelectorStateReducer';
import dataSourceSelectorStateReducer from '../dataexplorerpage/leftpane/datasourceselector/model/state/reducer/dataSourceSelectorStateReducer';
import measureSelectorStateReducer from '../dataexplorerpage/leftpane/measureselector/model/state/reducer/measureSelectorStateReducer';
import dimensionSelectorStateReducer from '../dataexplorerpage/leftpane/dimensionselector/model/state/reducer/dimensionSelectorStateReducer';
import createChartAreaStateReducer from '../common/components/chartarea/model/state/reducer/createChartAreaStateReducer';
import dataExplorerSettingsStateReducer from '../dataexplorerpage/settings/state/reducer/dataExplorerSettingsStateReducer';
import saveAsDashboardOrReportTemplateDialogStateReducer from '../dataexplorerpage/saveasdashboardorreporttemplatedialog/model/state/reducer/saveAsDashboardOrReportTemplateDialogStateReducer';
import createSortBySelectorStateReducer from '../common/components/sortbyselector/model/state/reducer/createSortBySelectorStateReducer';
import dashboardsPageStateReducer from '../dashboardspage/model/state/reducer/dashboardsPageStateReducer';
import createTriggerDataSourceSelectorStateReducer from '../common/components/triggerspage/leftpane/triggerdatasourceselector/model/state/reducer/createTriggerDataSourceSelectorStateReducer';
import createTriggerGroupSelectorStateReducer from '../common/components/triggerspage/leftpane/triggergroupselector/model/state/reducer/createTriggerGroupSelectorStateReducer';
import createTriggerSelectorStateReducer from '../common/components/triggerspage/leftpane/triggerselector/model/state/reducer/createTriggerSelectorStateReducer';
import createPageStateReducer from '../common/components/page/model/state/reducer/createPageStateReducer';
import createSelectorStateReducer from '../common/components/selector/model/state/reducer/createSelectorStateReducer';
import selectorStateNamespaces from '../common/components/selector/model/state/namespace/SelectorStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../common/components/selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import createSelectorWithDefaultActionsStateReducer from '../common/components/selectorwithdefaultactions/model/state/reducer/createSelectorWithDefaultActionsStateReducer';
import dashboardsPageHeaderStateReducer from '../dashboardspage/header/model/state/reducer/dashboardsPageHeaderStateReducer';
import createTriggersPageChartAreaStateReducer from '../common/components/triggerspage/chartarea/model/state/reducer/createTriggersPageChartAreaStateReducer';
import pageStateNamespaces from '../common/components/page/model/state/namespace/PageStateNamespace';

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
