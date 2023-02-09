import type { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';

export default class TriggersPageLeftPaneViewUtils {
  static updateSelectorContentHeights(
    pageStateNamespace: TriggersPageStateNamespace,
    {
      isTriggerDataSourceSelectorOpen,
      isTriggerGroupSelectorOpen,
      isTriggerSelectorOpen
    }: {
      [K in string]: boolean;
    }
  ) {
    const leftPaneElem = document.getElementById(`${pageStateNamespace}LeftPane`);

    const triggerDataSourceSelectorTitleElem: HTMLElement | null = document.querySelector(
      `#${pageStateNamespace}TriggerDataSourceSelector .title`
    );

    const triggerDataSourceSelectorContentElem: HTMLElement | null = document.querySelector(
      `#${pageStateNamespace}TriggerDataSourceSelector .content`
    );

    const triggerGroupSelectorTitleElem: HTMLElement | null = document.querySelector(
      `#${pageStateNamespace}TriggerGroupSelector .title`
    );

    const triggerGroupSelectorContentElem: HTMLElement | null = document.querySelector(
      `#${pageStateNamespace}TriggerGroupSelector .content`
    );

    const triggerSelectorTitleElem: HTMLElement | null = document.querySelector(
      `#${pageStateNamespace}TriggerSelector .title`
    );

    const triggerSelectorContentElem: HTMLElement | null = document.querySelector(
      `#${pageStateNamespace}TriggerSelector .content`
    );

    // noinspection OverlyComplexBooleanExpressionJS
    if (
      leftPaneElem &&
      triggerDataSourceSelectorTitleElem &&
      triggerDataSourceSelectorContentElem &&
      triggerGroupSelectorTitleElem &&
      triggerGroupSelectorContentElem &&
      triggerSelectorTitleElem &&
      triggerSelectorContentElem
    ) {
      const leftPaneHeight = leftPaneElem.getBoundingClientRect().height;
      const triggerDataSourceSelectorTitleHeight = triggerDataSourceSelectorTitleElem.getBoundingClientRect().height;
      const triggerGroupSelectorTitleHeight = triggerGroupSelectorTitleElem.getBoundingClientRect().height;
      const triggerSelectorTitleHeight = triggerSelectorTitleElem.getBoundingClientRect().height;

      const availableHeight =
        leftPaneHeight -
        (triggerDataSourceSelectorTitleHeight + triggerGroupSelectorTitleHeight + triggerSelectorTitleHeight);

      if (isTriggerDataSourceSelectorOpen && isTriggerGroupSelectorOpen && isTriggerSelectorOpen) {
        triggerDataSourceSelectorContentElem.style.height = `${0.2 * availableHeight}px`;
        triggerGroupSelectorContentElem.style.height = `${0.4 * availableHeight}px`;
        triggerSelectorContentElem.style.height = `${0.4 * availableHeight}px`;
      } else if (isTriggerDataSourceSelectorOpen && isTriggerGroupSelectorOpen && !isTriggerSelectorOpen) {
        triggerDataSourceSelectorContentElem.style.height = `${0.33 * availableHeight}px`;
        triggerGroupSelectorContentElem.style.height = `${0.66 * availableHeight}px`;
      } else if (isTriggerDataSourceSelectorOpen && !isTriggerGroupSelectorOpen && isTriggerSelectorOpen) {
        triggerDataSourceSelectorContentElem.style.height = `${0.33 * availableHeight}px`;
        triggerSelectorContentElem.style.height = `${0.66 * availableHeight}px`;
      } else if (!isTriggerDataSourceSelectorOpen && isTriggerGroupSelectorOpen && isTriggerSelectorOpen) {
        triggerGroupSelectorContentElem.style.height = `${0.5 * availableHeight}px`;
        triggerSelectorContentElem.style.height = `${0.5 * availableHeight}px`;
      } else if (isTriggerDataSourceSelectorOpen && !isTriggerGroupSelectorOpen && !isTriggerSelectorOpen) {
        triggerDataSourceSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isTriggerDataSourceSelectorOpen && isTriggerGroupSelectorOpen && !isTriggerSelectorOpen) {
        triggerGroupSelectorContentElem.style.height = `${availableHeight}px`;
      } else if (!isTriggerDataSourceSelectorOpen && !isTriggerGroupSelectorOpen && isTriggerSelectorOpen) {
        triggerSelectorContentElem.style.height = `${availableHeight}px`;
      }
    }
  }
}
