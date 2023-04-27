export default class DataExplorerPageRightPaneViewUtils {
  static updateSelectorContentHeights({
    isDataPointsCountSelectorOpen,
    isFilterSelectorOpen,
    isSortBySelectorOpen
  }: {
    isDataPointsCountSelectorOpen: boolean;
    isFilterSelectorOpen: boolean;
    isSortBySelectorOpen: boolean;
  }) {
    const rightPaneElem = document.getElementById('dataExplorerPageRightPane');
    const actionIconsElem = document.getElementById('dataExplorerPageActionIcons');
    const filterSelectorTitleElem: HTMLElement | null = document.querySelector(
      '#dataExplorerPageFilterSelector .title'
    );
    const filterSelectorContentElem: HTMLElement | null = document.querySelector(
      '#dataExplorerPageFilterSelector .content'
    );
    const sortBySelectorTitleElem: HTMLElement | null = document.querySelector(
      '#dataExplorerPageSortBySelector .title'
    );
    const sortBySelectorContentElem: HTMLElement | null = document.querySelector(
      '#dataExplorerPageSortBySelector .content'
    );
    const dataPointsCountSelectorTitleElem: HTMLElement | null = document.querySelector(
      '#dataExplorerPageDataPointsCountSelector .title'
    );
    const dataPointsCountSelectorContentElem: HTMLElement | null = document.querySelector(
      '#dataExplorerPageDataPointsCountSelector .content'
    );

    // noinspection OverlyComplexBooleanExpressionJS
    if (
      rightPaneElem &&
      actionIconsElem &&
      filterSelectorTitleElem &&
      filterSelectorContentElem &&
      sortBySelectorTitleElem &&
      sortBySelectorContentElem &&
      dataPointsCountSelectorTitleElem &&
      dataPointsCountSelectorContentElem
    ) {
      const rightPaneHeight = rightPaneElem.getBoundingClientRect().height;
      const actionIconsHeight = actionIconsElem.getBoundingClientRect().height;
      const filterSelectorTitleHeight = filterSelectorTitleElem.getBoundingClientRect().height;
      const sortBySelectorTitleHeight = sortBySelectorTitleElem.getBoundingClientRect().height;
      const dataPointsCountSelectorTitleHeight = dataPointsCountSelectorTitleElem.getBoundingClientRect().height;
      const dataPointsCountSelectorContentHeight = dataPointsCountSelectorContentElem.getBoundingClientRect().height;

      const availableHeight =
        rightPaneHeight -
        (actionIconsHeight +
          filterSelectorTitleHeight +
          sortBySelectorTitleHeight +
          dataPointsCountSelectorTitleHeight);

      if (isFilterSelectorOpen && isSortBySelectorOpen && isDataPointsCountSelectorOpen) {
        filterSelectorContentElem.style.height = `${0.55 * (availableHeight - dataPointsCountSelectorContentHeight)}px`;
        sortBySelectorContentElem.style.height = `${0.45 * (availableHeight - dataPointsCountSelectorContentHeight)}px`;
      } else if (isFilterSelectorOpen && isSortBySelectorOpen && !isDataPointsCountSelectorOpen) {
        filterSelectorContentElem.style.height = `${0.5 * availableHeight}px`;
        sortBySelectorContentElem.style.height = `${0.5 * availableHeight}px`;
      } else if (isFilterSelectorOpen && !isSortBySelectorOpen && isDataPointsCountSelectorOpen) {
        filterSelectorContentElem.style.height = `${availableHeight - dataPointsCountSelectorContentHeight}px`;
      } else if (!isFilterSelectorOpen && isSortBySelectorOpen && isDataPointsCountSelectorOpen) {
        sortBySelectorContentElem.style.height = `${availableHeight - dataPointsCountSelectorContentHeight}px`;
      } else if (isFilterSelectorOpen && !isSortBySelectorOpen && !isDataPointsCountSelectorOpen) {
        filterSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isFilterSelectorOpen && isSortBySelectorOpen && !isDataPointsCountSelectorOpen) {
        sortBySelectorContentElem.style.height = `${availableHeight}px`;
      }
    }
  }
}
