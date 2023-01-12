import type { HeaderState } from '../header/model/state/HeaderState';
import type { DataSourceSelectorState } from '../dataexplorerpage/leftpane/datasourceselector/model/state/DataSourceSelectorState';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../dataexplorerpage/saveasdashboardorreporttemplatedialog/model/state/SaveAsDashboardOrReportTemplateDialogState';
import type { TriggerGroupSelectorState } from '../common/components/triggerspage/leftpane/triggergroupselector/model/state/TriggerGroupSelectorState';
import type { DashboardsState } from '../dashboardspage/model/state/DashboardsState';
import type { LayoutSelectorState } from '../dataexplorerpage/leftpane/layoutselector/model/state/LayoutSelectorState';
import type { MeasureSelectorState } from '../dataexplorerpage/leftpane/measureselector/model/state/MeasureSelectorState';
import type { DimensionSelectorState } from '../dataexplorerpage/leftpane/dimensionselector/model/state/DimensionSelectorState';
import type { ChartAreaState } from '../common/components/chartarea/model/state/ChartAreaState';
import type { SortBySelectorState } from '../common/components/sortbyselector/model/state/SortBySelectorState';
import type { DataExplorerSettingsState } from '../dataexplorerpage/settings/state/DataExplorerSettingsState';
import type { TriggerSelectorState } from '../common/components/triggerspage/leftpane/triggerselector/model/state/TriggerSelectorState';
import type { TriggerDataSourceSelectorState } from '../common/components/triggerspage/leftpane/triggerdatasourceselector/model/state/TriggerDataSourceSelectorState';
import type { PageState } from '../common/components/page/model/state/PageState';
import type { SelectorState } from '../common/components/selector/model/state/SelectorState';
import selectorStateNamespaces from '../common/components/selector/model/state/namespace/SelectorStateNamespace';
import type { SelectorWithDefaultActionsState } from '../common/components/selectorwithdefaultactions/model/state/SelectorWithDefaultActionsState';
import selectorWithDefaultActionsStateNamespaces from '../common/components/selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import type { DashboardsPageHeaderState } from '../dashboardspage/header/model/state/DashboardsPageHeaderState';
import pageStateNamespaces from '../common/components/page/model/state/namespace/PageStateNamespace';

export type AppState = {
  common: {
    selectorStates: { [K in keyof typeof selectorStateNamespaces]: SelectorState };
    selectorWithDefaultActionsStates: {
      [K in keyof typeof selectorWithDefaultActionsStateNamespaces]: SelectorWithDefaultActionsState;
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
    settingsState: DataExplorerSettingsState;
    saveAsDashboardOrReportTemplateDialogState: SaveAsDashboardOrReportTemplateDialogState;
  };
  dashboardsPage: {
    dashboardsState: DashboardsState;
    headerState: DashboardsPageHeaderState;
    chartAreaState: ChartAreaState;
    sortBySelectorState: SortBySelectorState;
  };
  alertsPage: {
    triggerDataSourceSelectorState: TriggerDataSourceSelectorState;
    triggerGroupSelectorState: TriggerGroupSelectorState;
    triggerSelectorState: TriggerSelectorState;
    chartAreaState: ChartAreaState;
  };
  goalsPage: {
    triggerDataSourceSelectorState: TriggerDataSourceSelectorState;
    triggerGroupSelectorState: TriggerGroupSelectorState;
    triggerSelectorState: TriggerSelectorState;
    chartAreaState: ChartAreaState;
  };
};
