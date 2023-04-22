import _ from 'lodash';
import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import stopEventPropagation from '../../../../utils/stopEventPropagation';

type Props = {
  addIconTooltipText?: string;
  handlePinIconClick?: (...args: never[]) => void;
  handleReorderIconClick: () => void;
  handleSelectAllIconClick?: () => void;
  iconClassName: string;
  isPinned?: boolean;
  position: 'leftPane' | 'rightPane';
  reorderIconTooltipText?: string;
  shouldShowPinIcon?: boolean;
  toggleShowSearchInput: (...args: never[]) => void;
  toggleMaximizeSelector: (...args: never[]) => void;
};

const SelectorTitleActionsView: React.FC<Props> = ({
  addIconTooltipText,
  handlePinIconClick,
  handleReorderIconClick,
  handleSelectAllIconClick,
  iconClassName,
  isPinned,
  position,
  reorderIconTooltipText,
  shouldShowPinIcon,
  toggleShowSearchInput,
  toggleMaximizeSelector
}: Props) => {
  let pinIconColor = '#eee';

  if (isPinned && position === 'leftPane') {
    pinIconColor = 'var(--brand-color-2)';
  } else if (isPinned && position === 'rightPane') {
    pinIconColor = 'var(--brand-color-2)';
  }

  const addIcon = (
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={<Icon className={iconClassName} name="plus" />}
      content={addIconTooltipText}
    />
  );

  const selectAllIcon = (
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={<Icon className={iconClassName} name="check" />}
      content="Select all"
    />
  );

  const searchIcon = (
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={<Icon className={iconClassName} name="search" onClick={toggleShowSearchInput} />}
      content="Show or hide search bar"
    />
  );

  const maximizeIcon = (
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={<Icon className={iconClassName} name="resize vertical" onClick={toggleMaximizeSelector} />}
      content="Maximize vertically"
    />
  );

  const pinIcon = (
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={
        <Icon
          className={iconClassName}
          style={{
            color: pinIconColor,
            visibility: 'visible'
          }}
          name="pin"
          onClick={handlePinIconClick}
        />
      }
      content="Pin or unpin left pane"
    />
  );

  const reorderIcon = (
    <Popup
      inverted
      mouseEnterDelay={1000}
      trigger={
        <Icon className={iconClassName} name="bars" onClick={_.flow(stopEventPropagation, handleReorderIconClick)} />
      }
      content={reorderIconTooltipText}
    />
  );

  return (
    <div>
      {addIconTooltipText && addIcon}
      {handleSelectAllIconClick && selectAllIcon}
      {searchIcon}
      {reorderIconTooltipText && reorderIcon}
      {maximizeIcon}
      {shouldShowPinIcon && pinIcon}
    </div>
  );
};

SelectorTitleActionsView.defaultProps = {
  addIconTooltipText: '',
  handlePinIconClick: _.noop,
  handleSelectAllIconClick: undefined,
  isPinned: false,
  reorderIconTooltipText: undefined,
  shouldShowPinIcon: false
};

export default SelectorTitleActionsView;
