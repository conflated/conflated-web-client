// @flow

import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';

export default class TriggersPageLeftPaneViewUtils {
  static updateSelectorContentHeights(
    pageStateNamespace: TriggersPageStateNamespace,
    {
      isTriggerDataSourceSelectorOpen,
      isTriggerGroupSelectorOpen,
      isTriggerSelectorOpen
    }: {
      [string]: boolean
    }
  ) {
    const leftPaneElem = document.getElementById(`${pageStateNamespace}LeftPane`);

    const triggerDataSourceSelectorTitleElem = document.querySelector(
      `#${pageStateNamespace}TriggerDataSourceSelector .title`
    );

    const triggerDataSourceSelectorContentElem = document.querySelector(
      `#${pageStateNamespace}TriggerDataSourceSelector .content`
    );

    const triggerGroupSelectorTitleElem = document.querySelector(
      `#${pageStateNamespace}TriggerGroupSelector .title`
    );

    const triggerGroupSelectorContentElem = document.querySelector(
      `#${pageStateNamespace}TriggerGroupSelector .content`
    );

    const triggerSelectorTitleElem = document.querySelector(`#${pageStateNamespace}TriggerSelector .title`);

    const triggerSelectorContentElem = document.querySelector(
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
      const triggerDataSourceSelectorTitleHeight = triggerDataSourceSelectorTitleElem.getBoundingClientRect()
        .height;
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
