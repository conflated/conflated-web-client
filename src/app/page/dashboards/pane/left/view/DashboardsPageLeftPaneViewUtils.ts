import Constants from '../../../../../common/Constants';

export default class DashboardsPageLeftPaneViewUtils {
  static updateSelectorContentHeights(isDashboardGroupSelectorOpen: boolean, isDashboardSelectorOpen: boolean) {
    const leftPaneElem: HTMLElement | null = document.getElementById('dashboardsPageLeftPane');

    const dashboardGroupSelectorTitleElem: HTMLElement | null = document.querySelector(
      '#dashboardGroupSelector .title'
    );

    const dashboardGroupSelectorContentElem: HTMLElement | null = document.querySelector(
      '#dashboardGroupSelector .content'
    );

    const dashboardSelectorTitleElem: HTMLElement | null = document.querySelector('#dashboardSelector .title');
    const dashboardSelectorContentElem: HTMLElement | null = document.querySelector('#dashboardSelector .content');

    // noinspection OverlyComplexBooleanExpressionJS
    if (
      leftPaneElem &&
      dashboardGroupSelectorTitleElem &&
      dashboardGroupSelectorContentElem &&
      dashboardSelectorTitleElem &&
      dashboardSelectorContentElem
    ) {
      const leftPaneHeight = leftPaneElem.getBoundingClientRect().height;
      const dashboardGroupSelectorTitleHeight = dashboardGroupSelectorTitleElem.getBoundingClientRect().height;
      const dashboardSelectorTitleHeight = dashboardSelectorTitleElem.getBoundingClientRect().height;
      const availableHeight = leftPaneHeight - (dashboardGroupSelectorTitleHeight + dashboardSelectorTitleHeight);

      if (isDashboardGroupSelectorOpen && isDashboardSelectorOpen) {
        dashboardGroupSelectorContentElem.style.height = `${
          Constants.DASHBOARD_GROUP_SELECTOR_RELATIVE_HEIGHT * availableHeight
        }px`;
        dashboardSelectorContentElem.style.height = `${
          Constants.DASHBOARD_SELECTOR_RELATIVE_HEIGHT * availableHeight
        }px`;
      } else if (isDashboardGroupSelectorOpen && !isDashboardSelectorOpen) {
        dashboardGroupSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isDashboardGroupSelectorOpen && isDashboardSelectorOpen) {
        dashboardSelectorContentElem.style.height = `${availableHeight}px`;
      }
    }
  }
}
