import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import type { AppState } from '../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';
import TriggersPageLeftPaneControllerFactory from '../controller/TriggersPageLeftPaneControllerFactory';
import TriggersPageLeftPaneViewUtils from './TriggersPageLeftPaneViewUtils';
import selectorStateNamespaces from '../../../selector/model/state/namespace/SelectorStateNamespace';
import PagePaneView from '../../../../view/pagepane/PagePaneView';
import TriggerDataSourceSelectorView from '../triggerdatasourceselector/view/TriggerDataSourceSelectorView';
import TriggerGroupSelectorView from '../triggergroupselector/view/TriggerGroupSelectorView';
import TriggerSelectorView from '../triggerselector/view/TriggerSelectorView';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) => ({
  isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
  triggersPageLeftPaneGutterOffset: appState.common.pageStates[pageStateNamespace].pagePaneGutterOffset.leftPane,

  shouldShowTriggersPageLeftPane: appState.common.pageStates[pageStateNamespace].shouldShowPagePane.leftPane,

  shouldShowTriggersPageLeftPanePermanently:
    appState.common.pageStates[pageStateNamespace].shouldShowPagePanePermanently.leftPane,

  isTriggerDataSourceSelectorOpen:
    appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
      .isSelectorOpen,

  isTriggerGroupSelectorOpen:
    appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]].isSelectorOpen,

  isTriggerSelectorOpen:
    appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
});

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new TriggersPageLeftPaneControllerFactory(dispatch, pageStateNamespace).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

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

export default connect(mapAppStateToComponentProps, createController)(TriggersPageLeftPaneView);
