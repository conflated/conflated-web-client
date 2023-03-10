import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import SelectorWithActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/reportTemplateSelectorController';
import ReportTemplateSelectorListItemView from './listitem/ReportTemplateSelectorListItemView';
import { ReportTemplate } from '../../../model/state/types/ReportTemplate';

type Props = ActionDispatchers & State;

const ReportTemplateSelectorView = ({
  generateReport,
  isReportTemplateGroupSelectorOpen,
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
          onItemClick={() => generateReport(reportTemplate)}
          onItemDblClick={() => window.open('http://localhost:3000/dashboards', '_blank')}
          actions={[
            {
              iconName: 'share',
              perform: () => window.open('http://localhost:3000/dashboards', '_blank'),
              tooltipText: 'Open in new browser tab'
            },
            {
              iconName: 'linkify',
              perform: () => navigator.clipboard.writeText('http://localhost:3000/dashboards'),
              tooltipText: 'Copy link to clipboard'
            },
            { iconName: 'edit', perform: () => {}, tooltipText: 'Edit' },
            { iconName: 'i cursor', perform: () => {}, tooltipText: 'Rename' },
            { iconName: 'trash alternate outline', perform: () => {}, tooltipText: 'Delete' }
          ]}
        />
      )),
    [generateReport, shownReportTemplates]
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
