import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import type { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';
import TriggersPageLeftPaneViewUtils from './TriggersPageLeftPaneViewUtils';
import PagePaneView from '../../../../../views/pagepane/PagePaneView';
import TriggerDataSourceSelectorView from '../triggerdatasourceselector/view/TriggerDataSourceSelectorView';
import TriggerGroupSelectorView from '../triggerlabelselector/view/TriggerLabelSelectorView';
import TriggerSelectorView from '../triggerselector/view/TriggerSelectorView';
import { ActionDispatchers, controller, State } from '../controller/triggersPageLeftPaneController';

export type OwnProps = { stateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggersPageLeftPaneView = ({
  hideTriggersPageLeftPane,
  isFullScreenModeActive,
  isTriggerDataSourceSelectorOpen,
  isTriggerGroupSelectorOpen,
  isTriggerSelectorOpen,
  stateNamespace,
  shouldShowTriggersPageLeftPane,
  shouldShowTriggersPageLeftPanePermanently,
  triggersPageLeftPaneGutterOffset
}: Props) => {
  const updateSelectorContentHeights = useCallback(
    () =>
      _.before(2, () =>
        TriggersPageLeftPaneViewUtils.updateSelectorContentHeights(stateNamespace, {
          isTriggerDataSourceSelectorOpen,
          isTriggerGroupSelectorOpen,
          isTriggerSelectorOpen
        })
      )(),
    [stateNamespace, isTriggerDataSourceSelectorOpen, isTriggerGroupSelectorOpen, isTriggerSelectorOpen]
  );

  useEffect(() => updateSelectorContentHeights());

  useEffect(() => {
    setTimeout(() => updateSelectorContentHeights(), 1000);
  }, [isFullScreenModeActive, updateSelectorContentHeights]);

  return (
    <PagePaneView
      id={`${stateNamespace}LeftPane`}
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={() => hideTriggersPageLeftPane()}
      pane="leftPane"
      paneDefaultWidthCssVarName="triggers-page-left-pane-default-width"
      paneGutterOffset={triggersPageLeftPaneGutterOffset}
      shouldShowPagePane={shouldShowTriggersPageLeftPane}
      shouldShowPagePanePermanently={shouldShowTriggersPageLeftPanePermanently}
    >
      <TriggerDataSourceSelectorView stateNamespace={stateNamespace} />
      <TriggerGroupSelectorView stateNamespace={stateNamespace} />
      <TriggerSelectorView stateNamespace={stateNamespace} />
    </PagePaneView>
  );
};

export default connect(
  controller.getState,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(TriggersPageLeftPaneView);
