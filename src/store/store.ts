/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, combineReducers, Reducer } from 'redux';
import { createNamespacedReducers } from 'oo-redux-utils2';
import headerStateReducer from '../app/header/model/state/headerStateReducer';
import layoutSelectorStateReducer from '../app/page/dataexplorer/pane/left/selector/layout/model/state/layoutSelectorStateReducer';
import dataSourceSelectorStateReducer from '../app/page/dataexplorer/pane/left/selector/datasource/model/state/dataSourceSelectorStateReducer';
import measureSelectorStateReducer from '../app/page/dataexplorer/pane/left/selector/measure/model/state/measureSelectorStateReducer';
import dimensionSelectorStateReducer from '../app/page/dataexplorer/pane/left/selector/dimension/model/state/dimensionSelectorStateReducer';
import createChartAreaStateReducer from '../app/common/components/chartarea/model/state/createChartAreaStateReducer';
import dataExplorerSettingsStateReducer from '../app/page/dataexplorer/model/state/dataExplorerStateReducer';
import saveAsDashboardOrReportTemplateDialogStateReducer from '../app/page/dataexplorer/dialog/saveasdashboardorreporttemplate/model/state/saveAsDashboardOrReportTemplateDialogStateReducer';
import createSortBySelectorStateReducer from '../app/common/components/selector/sort/model/state/createSortSelectorStateReducer';
import dashboardsPageStateReducer from '../app/page/dashboards/model/state/dashboardsPageStateReducer';
import createTriggerDataSourceSelectorStateReducer from '../app/common/components/page/triggers/leftpane/selector/datasource/model/state/createTriggerDataSourceSelectorStateReducer';
import createTriggerGroupSelectorStateReducer from '../app/common/components/page/triggers/leftpane/selector/triggerlabel/model/state/createTriggerLabelSelectorStateReducer';
import createTriggerSelectorStateReducer from '../app/common/components/page/triggers/leftpane/selector/trigger/model/state/createTriggerSelectorStateReducer';
import createPageStateReducer from '../app/common/components/page/model/state/createPageStateReducer';
import createSelectorStateReducer from '../app/common/components/selector/model/state/createSelectorStateReducer';
import selectorStateNamespaces from '../app/common/components/selector/model/state/types/SelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../app/common/components/selector/withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import createSelectorWithDefaultActionsStateReducer from '../app/common/components/selector/withtitleactions/model/state/createSelectorWithTitleActionsStateReducer';
import dashboardsPageHeaderStateReducer from '../app/page/dashboards/header/model/state/dashboardsPageHeaderStateReducer';
import createTriggersPageChartAreaStateReducer from '../app/common/components/page/triggers/chartarea/model/state/createTriggersPageChartAreaStateReducer';
import pageStateNamespaces from '../app/common/components/page/model/state/types/PageStateNamespace';
import dashboardGroupSelectorStateReducer from '../app/page/dashboards/pane/left/selector/dashboardgroup/model/state/dashboardGroupSelectorStateReducer';
import reportsPageStateReducer from '../app/page/reports/model/state/reportsPageStateReducer';
import reportTemplateGroupSelectorStateReducer from '../app/page/reports/leftpane/selector/reporttemplategroup/model/state/reportTemplateGroupSelectorStateReducer';
import generateReportDialogStateReducer from '../app/page/reports/generatereportdialog/model/state/generateReportDialogStateReducer';
import createTriggersPageStateReducer from '../app/common/components/page/triggers/model/state/createTriggersPageStateReducer';
import { AppState } from './AppState';

const appStateReducer: Reducer<AppState> = combineReducers({
  common: combineReducers({
    selectorStates: combineReducers(createNamespacedReducers(selectorStateNamespaces, createSelectorStateReducer)),
    selectorWithDefaultActionsStates: combineReducers(
      createNamespacedReducers(selectorWithActionsStateNamespaces, createSelectorWithDefaultActionsStateReducer)
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
    dashboardGroupSelectorState: dashboardGroupSelectorStateReducer,
    chartAreaState: createChartAreaStateReducer('dashboardsPage'),
    sortBySelectorState: createSortBySelectorStateReducer('dashboardsPage')
  }),
  reportsPage: combineReducers({
    reportsState: reportsPageStateReducer,
    reportTemplateGroupSelectorState: reportTemplateGroupSelectorStateReducer,
    chartAreaState: createChartAreaStateReducer('reportsPage'),
    generateReportDialogState: generateReportDialogStateReducer
  }),
  alertsPage: combineReducers({
    triggersPageState: createTriggersPageStateReducer('alertsPage'),
    triggerDataSourceSelectorState: createTriggerDataSourceSelectorStateReducer('alertsPage'),
    triggerGroupSelectorState: createTriggerGroupSelectorStateReducer('alertsPage'),
    triggerSelectorState: createTriggerSelectorStateReducer('alertsPage'),
    chartAreaState: createTriggersPageChartAreaStateReducer('alertsPage')
  }),
  goalsPage: combineReducers({
    triggersPageState: createTriggersPageStateReducer('goalsPage'),
    triggerDataSourceSelectorState: createTriggerDataSourceSelectorStateReducer('goalsPage'),
    triggerGroupSelectorState: createTriggerGroupSelectorStateReducer('goalsPage'),
    triggerSelectorState: createTriggerSelectorStateReducer('goalsPage'),
    chartAreaState: createTriggersPageChartAreaStateReducer('goalsPage')
  })
});

// noinspection JSDeprecatedSymbols
export default createStore(
  appStateReducer,
  // eslint-disable-next-line no-underscore-dangle
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
