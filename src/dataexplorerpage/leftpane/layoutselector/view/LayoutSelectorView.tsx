import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import LayoutIconsView from './layouticons/LayoutIconsView';
import type { AppState } from '../../../../store/AppState';
import LayoutSelectorControllerFactory from '../controller/LayoutSelectorControllerFactory';
import SelectorView from '../../../../common/components/selector/view/SelectorView';
import LayoutSelectorTitleView from './title/LayoutSelectorTitleView';

const mapAppStateToComponentProps = (appState: AppState) =>
  OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.layoutSelectorState, {
    layout: appState.dataExplorerPage.chartAreaState.layout,

    shouldShowDataExplorerPageLeftPanePermanently:
      appState.common.pageStates.dataExplorerPage.shouldShowPagePanePermanently.leftPane
  });

const createController = (dispatch: Dispatch) => new LayoutSelectorControllerFactory(dispatch).createController();
type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function LayoutSelectorView({
  isLayoutLocked,
  layout,
  selectLayout,
  shouldShowDataExplorerPageLeftPanePermanently,
  toggleLayoutLocked,
  toggleShouldShowDataExplorerPageLeftPanePermanently
}: Props) {
  const handleLockIconClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      toggleLayoutLocked();
    },
    [toggleLayoutLocked]
  );

  const handlePinIconClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      toggleShouldShowDataExplorerPageLeftPanePermanently();
    },
    [toggleShouldShowDataExplorerPageLeftPanePermanently]
  );

  return (
    <SelectorView
      id="layoutSelector"
      titleText="LAYOUT"
      titleContent={
        <LayoutSelectorTitleView
          handleLockIconClick={handleLockIconClick}
          handlePinIconClick={handlePinIconClick}
          isLayoutLocked={isLayoutLocked}
          shouldShowDataExplorerPageLeftPanePermanently={shouldShowDataExplorerPageLeftPanePermanently}
        />
      }
      selectorContent={<LayoutIconsView selectedLayout={layout} selectLayout={selectLayout} />}
      selectorStateNamespace="layoutSelector"
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(LayoutSelectorView);
