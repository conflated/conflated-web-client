import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import LayoutIconsView from './layouticons/LayoutIconsView';
import type { AppState } from '../../../../../../store/AppState';
import SelectorView from '../../../../../common/components/selector/view/SelectorView';
import LayoutSelectorTitleView from './title/LayoutSelectorTitleView';
import { ActionDispatchers, controller, State } from '../layoutSelectorController';

type Props = ActionDispatchers & State;

const LayoutSelectorView = ({
  isLayoutLocked,
  layout,
  selectLayout,
  shouldShowDataExplorerPageLeftPanePermanently,
  toggleLayoutLocked,
  toggleShouldShowDataExplorerPageLeftPanePermanently
}: Props) => {
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
};

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(LayoutSelectorView);
