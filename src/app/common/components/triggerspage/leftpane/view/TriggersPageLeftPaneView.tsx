import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import type { AppState } from '../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';
import TriggersPageLeftPaneViewUtils from './TriggersPageLeftPaneViewUtils';
import PagePaneView from '../../../../view/pagepane/PagePaneView';
import TriggerDataSourceSelectorView from '../triggerdatasourceselector/view/TriggerDataSourceSelectorView';
import TriggerGroupSelectorView from '../triggergroupselector/view/TriggerGroupSelectorView';
import TriggerSelectorView from '../triggerselector/view/TriggerSelectorView';
import { ActionDispatchers, controller, State } from '../triggersPageLeftPaneController';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggersPageLeftPaneView = ({
  hideTriggersPageLeftPane,
  isFullScreenModeActive,
  isTriggerDataSourceSelectorOpen,
  isTriggerGroupSelectorOpen,
  isTriggerSelectorOpen,
  pageStateNamespace,
  shouldShowTriggersPageLeftPane,
  shouldShowTriggersPageLeftPanePermanently,
  triggersPageLeftPaneGutterOffset
}: Props) => {
  const updateSelectorContentHeights = useCallback(
    () =>
      _.before(2, () =>
        TriggersPageLeftPaneViewUtils.updateSelectorContentHeights(pageStateNamespace, {
          isTriggerDataSourceSelectorOpen,
          isTriggerGroupSelectorOpen,
          isTriggerSelectorOpen
        })
      )(),
    [pageStateNamespace, isTriggerDataSourceSelectorOpen, isTriggerGroupSelectorOpen, isTriggerSelectorOpen]
  );

  useEffect(() => updateSelectorContentHeights());

  useEffect(() => {
    setTimeout(() => updateSelectorContentHeights(), 1000);
  }, [isFullScreenModeActive, updateSelectorContentHeights]);

  return (
    <PagePaneView
      id={`${pageStateNamespace}LeftPane`}
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={() => hideTriggersPageLeftPane()}
      pane="leftPane"
      paneDefaultWidthCssVarName="triggers-page-left-pane-default-width"
      paneGutterOffset={triggersPageLeftPaneGutterOffset}
      shouldShowPagePane={shouldShowTriggersPageLeftPane}
      shouldShowPagePanePermanently={shouldShowTriggersPageLeftPanePermanently}
    >
      <TriggerDataSourceSelectorView pageStateNamespace={pageStateNamespace} />
      <TriggerGroupSelectorView pageStateNamespace={pageStateNamespace} />
      <TriggerSelectorView pageStateNamespace={pageStateNamespace} />
    </PagePaneView>
  );
};

export default connect(
  (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
  (__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
)(TriggersPageLeftPaneView);
