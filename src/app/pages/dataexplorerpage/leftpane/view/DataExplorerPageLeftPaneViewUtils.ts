export default class DataExplorerPageLeftPaneViewUtils {
  static updateSelectorContentHeights({
    isDataSourceSelectorOpen,
    isMeasureSelectorOpen,
    isDimensionSelectorOpen
  }: {
    isDataSourceSelectorOpen: boolean;
    isMeasureSelectorOpen: boolean;
    isDimensionSelectorOpen: boolean;
  }) {
    const leftPaneElem = document.getElementById('dataExplorerPageLeftPane');
    const layoutSelectorElem = document.getElementById('layoutSelector');
    const chartTypeSelectorElem = document.getElementById('chartTypeSelector');
    const dataSourceSelectorTitleElem: HTMLElement | null = document.querySelector('#dataSourceSelector .title');
    const dataSourceSelectorContentElem: HTMLElement | null = document.querySelector('#dataSourceSelector .content');
    const measureSelectorTitleElem: HTMLElement | null = document.querySelector('#measureSelector .title');
    const measureSelectorContentElem: HTMLElement | null = document.querySelector('#measureSelector .content');
    const dimensionSelectorTitleElem: HTMLElement | null = document.querySelector('#dimensionSelector .title');
    const dimensionSelectorContentElem: HTMLElement | null = document.querySelector('#dimensionSelector .content');

    // noinspection OverlyComplexBooleanExpressionJS
    if (
      leftPaneElem &&
      layoutSelectorElem &&
      chartTypeSelectorElem &&
      dataSourceSelectorTitleElem &&
      dataSourceSelectorContentElem &&
      measureSelectorTitleElem &&
      measureSelectorContentElem &&
      dimensionSelectorTitleElem &&
      dimensionSelectorContentElem
    ) {
      const leftPaneHeight = leftPaneElem.getBoundingClientRect().height;
      const layoutSelectorHeight = layoutSelectorElem.getBoundingClientRect().height;
      const chartTypeSelectorHeight = chartTypeSelectorElem.getBoundingClientRect().height;
      const dataSourceSelectorTitleHeight = dataSourceSelectorTitleElem.getBoundingClientRect().height;
      const measureSelectorTitleHeight = measureSelectorTitleElem.getBoundingClientRect().height;
      const dimensionSelectorTitleHeight = dimensionSelectorTitleElem.getBoundingClientRect().height;

      const availableHeight =
        leftPaneHeight -
        (layoutSelectorHeight +
          chartTypeSelectorHeight +
          dataSourceSelectorTitleHeight +
          measureSelectorTitleHeight +
          dimensionSelectorTitleHeight);

      // noinspection IfStatementWithTooManyBranchesJS
      if (isDataSourceSelectorOpen && isMeasureSelectorOpen && isDimensionSelectorOpen) {
        dataSourceSelectorContentElem.style.height = `${0.2 * availableHeight}px`;
        measureSelectorContentElem.style.height = `${0.4 * availableHeight}px`;
        dimensionSelectorContentElem.style.height = `${0.4 * availableHeight}px`;
      } else if (isDataSourceSelectorOpen && isMeasureSelectorOpen && !isDimensionSelectorOpen) {
        dataSourceSelectorContentElem.style.height = `${0.33 * availableHeight}px`;
        measureSelectorContentElem.style.height = `${0.66 * availableHeight}px`;
      } else if (isDataSourceSelectorOpen && !isMeasureSelectorOpen && isDimensionSelectorOpen) {
        dataSourceSelectorContentElem.style.height = `${0.33 * availableHeight}px`;
        dimensionSelectorContentElem.style.height = `${0.66 * availableHeight}px`;
      } else if (!isDataSourceSelectorOpen && isMeasureSelectorOpen && isDimensionSelectorOpen) {
        measureSelectorContentElem.style.height = `${0.5 * availableHeight}px`;
        dimensionSelectorContentElem.style.height = `${0.5 * availableHeight}px`;
      } else if (isDataSourceSelectorOpen && !isMeasureSelectorOpen && !isDimensionSelectorOpen) {
        dataSourceSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isDataSourceSelectorOpen && isMeasureSelectorOpen && !isDimensionSelectorOpen) {
        measureSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isDataSourceSelectorOpen && !isMeasureSelectorOpen && isDimensionSelectorOpen) {
        dimensionSelectorContentElem.style.height = `${availableHeight}px`;
      }
    }
  }
}
