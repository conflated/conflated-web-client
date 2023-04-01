import { createSelector } from 'reselect';
import type { AppState } from '../../../../../../../../store/AppState';
import FilterUtils from '../../../../../../../common/utils/FilterUtils';
import { ReportTemplateGroup } from '../../../../../model/state/types/ReportTemplateGroup';

const reportTemplateGroupsSelector = (appState: AppState) => appState.reportsPage.reportsState.reportTemplateGroups;

const searchedValueSelector = (appState: AppState) =>
  appState.common.selectorWithDefaultActionsStates.reportTemplateGroupSelector.searchedValue;

export default createSelector(
  [reportTemplateGroupsSelector, searchedValueSelector],
  (reportTemplateGroups: ReportTemplateGroup[], searchedValue: string) =>
    FilterUtils.filterNamedObjectsByName(reportTemplateGroups, searchedValue)
);
