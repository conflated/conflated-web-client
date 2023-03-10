import { createSelector } from 'reselect';
import type { AppState } from '../../../../../../../store/AppState';
import FilterUtils from '../../../../../../common/utils/FilterUtils';
import { ReportTemplate } from '../../../../model/state/types/ReportTemplate';
import { ReportTemplateGroup } from '../../../../model/state/types/ReportTemplateGroup';

const selectedReportTemplateGroupSelector = (appState: AppState) =>
  appState.reportsPage.reportTemplateGroupSelectorState.selectedReportTemplateGroup;

const searchedValueSelector = (appState: AppState) =>
  appState.common.selectorWithDefaultActionsStates.reportTemplateSelector.searchedValue;

export default createSelector(
  [selectedReportTemplateGroupSelector, searchedValueSelector],
  (selectedReportTemplateGroup: ReportTemplateGroup | null | undefined, searchedValue: string): ReportTemplate[] => {
    const reportTemplates = selectedReportTemplateGroup?.reportTemplates || [];
    return FilterUtils.filterNamedObjectsByName(reportTemplates, searchedValue);
  }
);
