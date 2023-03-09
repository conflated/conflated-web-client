import Constants from '../../../../common/Constants';

export default class ReportsPageLeftPaneViewUtils {
  static updateSelectorContentHeights(
    isReportTemplateGroupSelectorOpen: boolean,
    isReportTemplateSelectorOpen: boolean
  ) {
    const leftPaneElem: HTMLElement | null = document.getElementById('reportsPageLeftPane');

    const reportTemplateGroupSelectorTitleElem: HTMLElement | null = document.querySelector(
      '#reportTemplateGroupSelector .title'
    );

    const reportTemplateGroupSelectorContentElem: HTMLElement | null = document.querySelector(
      '#reportTemplateGroupSelector .content'
    );

    const reportTemplateSelectorTitleElem: HTMLElement | null = document.querySelector(
      '#reportTemplateSelector .title'
    );
    const reportTemplateSelectorContentElem: HTMLElement | null = document.querySelector(
      '#reportTemplateSelector .content'
    );

    // noinspection OverlyComplexBooleanExpressionJS
    if (
      leftPaneElem &&
      reportTemplateGroupSelectorTitleElem &&
      reportTemplateGroupSelectorContentElem &&
      reportTemplateSelectorTitleElem &&
      reportTemplateSelectorContentElem
    ) {
      const leftPaneHeight = leftPaneElem.getBoundingClientRect().height;

      const reportTemplateGroupSelectorTitleHeight =
        reportTemplateGroupSelectorTitleElem.getBoundingClientRect().height;

      const reportTemplateSelectorTitleHeight = reportTemplateSelectorTitleElem.getBoundingClientRect().height;

      const availableHeight =
        leftPaneHeight - (reportTemplateGroupSelectorTitleHeight + reportTemplateSelectorTitleHeight);

      if (isReportTemplateGroupSelectorOpen && isReportTemplateSelectorOpen) {
        reportTemplateGroupSelectorContentElem.style.height = `${
          Constants.DASHBOARD_GROUP_SELECTOR_RELATIVE_HEIGHT * availableHeight
        }px`;

        reportTemplateSelectorContentElem.style.height = `${
          Constants.DASHBOARD_SELECTOR_RELATIVE_HEIGHT * availableHeight
        }px`;
      } else if (isReportTemplateGroupSelectorOpen && !isReportTemplateSelectorOpen) {
        reportTemplateGroupSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isReportTemplateGroupSelectorOpen && isReportTemplateSelectorOpen) {
        reportTemplateSelectorContentElem.style.height = `${availableHeight}px`;
      }
    }
  }
}
