import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import SelectorWithActionsView from '../../../../../../common/components/selector/withtitleactions/view/SelectorWithTitleActionsView';
import AllAndFavoritesTabView from '../../../../../../common/views/tab/selector/allandfavorites/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/reportTemplateSelectorController';
import ReportTemplateSelectorListItemView from './listitem/ReportTemplateSelectorListItemView';
import { ReportTemplate } from '../../../../model/state/types/ReportTemplate';

type Props = ActionDispatchers & State;

const ReportTemplateSelectorView = ({
  isReportTemplateGroupSelectorOpen,
  openGenerateReportDialog,
  shownReportTemplates,
  toggleMaximizeSelector
}: Props) => {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isReportTemplateGroupSelectorOpen,
          selectorStateNamespace: 'reportTemplateGroupSelector'
        }
      ]);
    },
    [isReportTemplateGroupSelectorOpen, toggleMaximizeSelector]
  );

  const reportTemplateListItems = useMemo(
    () =>
      shownReportTemplates.map((reportTemplate: ReportTemplate) => (
        <ReportTemplateSelectorListItemView
          item={reportTemplate}
          key={reportTemplate.name}
          onItemClick={openGenerateReportDialog}
          actions={[
            {
              iconName: 'play',
              perform: openGenerateReportDialog,
              tooltipText: 'Generate report'
            },
            {
              iconName: 'share',
              perform: () => window.open('http://localhost:3000/reports', '_blank'),
              tooltipText: 'Generate report in a new browser tab'
            },
            {
              iconName: 'star',
              perform: () => {},
              tooltipText: 'Add to favorites'
            },
            { iconName: 'edit', perform: () => {}, tooltipText: 'Edit' },
            { iconName: 'i cursor', perform: () => {}, tooltipText: 'Rename' },
            { iconName: 'trash alternate outline', perform: () => {}, tooltipText: 'Delete' }
          ]}
        />
      )),
    [openGenerateReportDialog, shownReportTemplates]
  );

  return (
    <SelectorWithActionsView
      id="reportTemplateSelector"
      titleText="REPORT TEMPLATES"
      addIconTooltipText="Add new dashboard"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={reportTemplateListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="reportTemplateSelector"
      reorderIconTooltipText="Reorder report templates"
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(ReportTemplateSelectorView);
