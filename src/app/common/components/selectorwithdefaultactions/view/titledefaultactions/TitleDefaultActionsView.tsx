import _ from 'lodash';
import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

type Props = {
  addIconTooltipText?: string;
  handlePinIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  iconClassName: string;
  isPinned?: boolean;
  shouldShowPinIcon?: boolean;
  toggleShowSearchInput: (event: React.MouseEvent<HTMLElement>) => void;
  toggleMaximizeAccordion: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function TitleDefaultActionsView({
  addIconTooltipText,
  handlePinIconClick,
  iconClassName,
  isPinned,
  shouldShowPinIcon,
  toggleShowSearchInput,
  toggleMaximizeAccordion
}: Props) {
  const pinIconColor = isPinned ? 'var(--secondary-text-color-on-hover)' : 'var(--secondary-text-color)';

  const addIcon = (
    <Popup inverted trigger={<Icon className={iconClassName} name="plus" />} content={addIconTooltipText} />
  );

  const searchIcon = (
    <Popup
      inverted
      trigger={<Icon className={iconClassName} name="search" onClick={toggleShowSearchInput} />}
      content="Show or hide search bar"
    />
  );

  const maximizeIcon = (
    <Popup
      inverted
      trigger={<Icon className={iconClassName} name="resize vertical" onClick={toggleMaximizeAccordion} />}
      content="Maximize vertically"
    />
  );

  const pinIcon = (
    <Popup
      inverted
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

  return (
    <div>
      {addIcon}
      {searchIcon}
      {maximizeIcon}
      {shouldShowPinIcon ? pinIcon : undefined}
    </div>
  );
}

TitleDefaultActionsView.defaultProps = {
  addIconTooltipText: '',
  shouldShowPinIcon: false,
  isPinned: false,
  handlePinIconClick: _.noop
};
