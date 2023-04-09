import type { HeaderState } from '../app/header/model/state/HeaderState';
import type { DataSourceSelectorState } from '../app/page/dataexplorer/pane/left/selector/datasource/model/state/DataSourceSelectorState';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../app/page/dataexplorer/dialog/saveasdashboardorreporttemplate/model/state/SaveAsDashboardOrReportTemplateDialogState';
import type { TriggerLabelSelectorState } from '../app/common/components/page/triggers/leftpane/triggerlabelselector/model/state/TriggerLabelSelectorState';
import type { DashboardsPageState } from '../app/page/dashboards/model/state/DashboardsPageState';
import type { LayoutSelectorState } from '../app/page/dataexplorer/pane/left/selector/layout/model/state/LayoutSelectorState';
import type { MeasureSelectorState } from '../app/page/dataexplorer/pane/left/selector/measure/model/state/MeasureSelectorState';
import type { DimensionSelectorState } from '../app/page/dataexplorer/pane/left/selector/dimension/model/state/DimensionSelectorState';
import type { ChartAreaState } from '../app/common/components/chartarea/model/state/ChartAreaState';
import type { SortBySelectorState } from '../app/common/components/selector/sortby/model/state/SortBySelectorState';
import type { DataExplorerState } from '../app/page/dataexplorer/model/state/DataExplorerState';
import type { TriggerSelectorState } from '../app/common/components/page/triggers/leftpane/triggerselector/model/state/TriggerSelectorState';
import type { TriggerDataSourceSelectorState } from '../app/common/components/page/triggers/leftpane/triggerdatasourceselector/model/state/TriggerDataSourceSelectorState';
import type { PageState } from '../app/common/components/page/model/state/PageState';
import type { SelectorState } from '../app/common/components/selector/model/state/SelectorState';
import selectorStateNamespaces from '../app/common/components/selector/model/state/types/SelectorStateNamespace';
import type { SelectorWithActionsState } from '../app/common/components/selector/withactions/model/state/SelectorWithActionsState';
import selectorWithActionsStateNamespaces from '../app/common/components/selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import type { DashboardsPageHeaderState } from '../app/page/dashboards/header/model/state/DashboardsPageHeaderState';
import pageStateNamespaces from '../app/common/components/page/model/state/types/PageStateNamespace';
import { DashboardGroupSelectorState } from '../app/page/dashboards/pane/left/selector/dashboardgroup/model/state/DashboardGroupSelectorState';
import { ReportsPageState } from '../app/page/reports/model/state/ReportsPageState';
import { ReportTemplateGroupSelectorState } from '../app/page/reports/leftpane/selector/reporttemplategroup/model/state/ReportTemplateGroupSelectorState';
import { GenerateReportDialogState } from '../app/page/reports/generatereportdialog/model/state/GenerateReportDialogState';
import { TriggersPageState } from '../app/common/components/page/triggers/model/state/TriggersPageState';

export type AppState = {
  common: {
    selectorStates: { [K in keyof typeof selectorStateNamespaces]: SelectorState };
    selectorWithDefaultActionsStates: {
      [K in keyof typeof selectorWithActionsStateNamespaces]: SelectorWithActionsState;
    };
    pageStates: { [K in keyof typeof pageStateNamespaces]: PageState };
  };
  headerState: HeaderState;
  dataExplorerPage: {
    layoutSelectorState: LayoutSelectorState;
    dataSourceSelectorState: DataSourceSelectorState;
    measureSelectorState: MeasureSelectorState;
    dimensionSelectorState: DimensionSelectorState;
    chartAreaState: ChartAreaState;
    sortBySelectorState: SortBySelectorState;
    settingsState: DataExplorerState;
    saveAsDashboardOrReportTemplateDialogState: SaveAsDashboardOrReportTemplateDialogState;
  };
  dashboardsPage: {
    dashboardsState: DashboardsPageState;
    headerState: DashboardsPageHeaderState;
    dashboardGroupSelectorState: DashboardGroupSelectorState;
    chartAreaState: ChartAreaState;
    sortBySelectorState: SortBySelectorState;
  };
  reportsPage: {
    reportsState: ReportsPageState;
    reportTemplateGroupSelectorState: ReportTemplateGroupSelectorState;
    chartAreaState: ChartAreaState;
    generateReportDialogState: GenerateReportDialogState;
  };
  alertsPage: {
    triggersPageState: TriggersPageState;
    triggerDataSourceSelectorState: TriggerDataSourceSelectorState;
    triggerGroupSelectorState: TriggerLabelSelectorState;
    triggerSelectorState: TriggerSelectorState;
    chartAreaState: ChartAreaState;
  };
  goalsPage: {
    triggersPageState: TriggersPageState;
    triggerDataSourceSelectorState: TriggerDataSourceSelectorState;
    triggerGroupSelectorState: TriggerLabelSelectorState;
    triggerSelectorState: TriggerSelectorState;
    chartAreaState: ChartAreaState;
  };
};
