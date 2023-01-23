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
      trigger={
        <Icon
          className={styles.actionIcon}
          name={isLayoutLocked ? 'lock' : 'lock open'}
          onClick={handleLockIconClick}
        />
      }
      content={
        isLayoutLocked
          ? 'Click to enable dragging and resizing charts in chart area'
          : 'Click to disable dragging and resizing charts in chart area'
      }
    />
    <Popup
      inverted
      trigger={
        <Icon
          className={styles.actionIcon}
          style={{
            color: shouldShowDataExplorerPageLeftPanePermanently
              ? 'var(--secondary-text-color-on-hover)'
              : 'var(--secondary-text-color)'
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
