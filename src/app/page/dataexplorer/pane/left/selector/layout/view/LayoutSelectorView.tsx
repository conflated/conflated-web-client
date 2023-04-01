import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import LayoutIconsView from './layouticons/LayoutIconsView';
import SelectorView from '../../../../../../../common/components/selector/view/SelectorView';
import LayoutSelectorTitleView from './title/LayoutSelectorTitleView';
import { ActionDispatchers, controller, State } from '../controller/layoutSelectorController';

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
      titleText="LAYOUTS"
      position="leftPane"
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

export default connect(controller.getState, () => controller.actionDispatchers)(LayoutSelectorView);
