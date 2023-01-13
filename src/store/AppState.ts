import type { HeaderState } from '../app/header/model/state/HeaderState';
import type { DataSourceSelectorState } from '../app/pages/dataexplorerpage/leftpane/datasourceselector/model/state/DataSourceSelectorState';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../app/pages/dataexplorerpage/saveasdashboardorreporttemplatedialog/model/state/SaveAsDashboardOrReportTemplateDialogState';
import type { TriggerGroupSelectorState } from '../app/common/components/triggerspage/leftpane/triggergroupselector/model/state/TriggerGroupSelectorState';
import type { DashboardsState } from '../app/pages/dashboardspage/model/state/DashboardsState';
import type { LayoutSelectorState } from '../app/pages/dataexplorerpage/leftpane/layoutselector/model/state/LayoutSelectorState';
import type { MeasureSelectorState } from '../app/pages/dataexplorerpage/leftpane/measureselector/model/state/MeasureSelectorState';
import type { DimensionSelectorState } from '../app/pages/dataexplorerpage/leftpane/dimensionselector/model/state/DimensionSelectorState';
import type { ChartAreaState } from '../app/common/components/chartarea/model/state/ChartAreaState';
import type { SortBySelectorState } from '../app/common/components/sortbyselector/model/state/SortBySelectorState';
import type { DataExplorerSettingsState } from '../app/pages/dataexplorerpage/settings/state/DataExplorerSettingsState';
import type { TriggerSelectorState } from '../app/common/components/triggerspage/leftpane/triggerselector/model/state/TriggerSelectorState';
import type { TriggerDataSourceSelectorState } from '../app/common/components/triggerspage/leftpane/triggerdatasourceselector/model/state/TriggerDataSourceSelectorState';
import type { PageState } from '../app/common/components/page/model/state/PageState';
import type { SelectorState } from '../app/common/components/selector/model/state/SelectorState';
import selectorStateNamespaces from '../app/common/components/selector/model/state/namespace/SelectorStateNamespace';
import type { SelectorWithDefaultActionsState } from '../app/common/components/selectorwithdefaultactions/model/state/SelectorWithDefaultActionsState';
import selectorWithDefaultActionsStateNamespaces from '../app/common/components/selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import type { DashboardsPageHeaderState } from '../app/pages/dashboardspage/header/model/state/DashboardsPageHeaderState';
import pageStateNamespaces from '../app/common/components/page/model/state/namespace/PageStateNamespace';

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
