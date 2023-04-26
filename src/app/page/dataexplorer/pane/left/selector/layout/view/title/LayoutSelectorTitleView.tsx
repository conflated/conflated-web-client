import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styles from './LayoutSelectorTitleView.module.scss';

type Props = {
  handleLockIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  handlePinIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  isLayoutLocked: boolean;
  shouldShowDataExplorerPageLeftPanePermanently: boolean;
};

const LayoutSelectorTitleView = ({
  handleLockIconClick,
  handlePinIconClick,
  isLayoutLocked,
  shouldShowDataExplorerPageLeftPanePermanently
}: Props) => (
  <>
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={
        <Icon
          className={styles.actionIcon}
          name={isLayoutLocked ? 'lock' : 'lock open'}
          onClick={handleLockIconClick}
          style={{
            color: isLayoutLocked ? 'var(--pin-icon-color)' : '#000'
          }}
        />
      }
      content={
        isLayoutLocked
          ? 'Click to enable dragging and resizing charts in the chart area'
          : 'Click to disable dragging and resizing charts in the chart area'
      }
    />
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={
        <Icon
          className={styles.actionIcon}
          style={{
            color: shouldShowDataExplorerPageLeftPanePermanently ? 'var(--pin-icon-color)' : '#000'
          }}
          name="pin"
          onClick={handlePinIconClick}
        />
      }
      content="Pin or unpin left pane"
    />
  </>
);

export default LayoutSelectorTitleView;
