import _ from 'lodash';
import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

type Props = {
  addIconTooltipText?: string;
  handlePinIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  iconClassName: string;
  isPinned?: boolean;
  position: 'leftPane' | 'rightPane';
  shouldShowPinIcon?: boolean;
  toggleShowSearchInput: (event: React.MouseEvent<HTMLElement>) => void;
  toggleMaximizeAccordion: (event: React.MouseEvent<HTMLElement>) => void;
};

const ActionsView: React.FC<Props> = ({
  addIconTooltipText,
  handlePinIconClick,
  iconClassName,
  isPinned,
  position,
  shouldShowPinIcon,
  toggleShowSearchInput,
  toggleMaximizeAccordion
}: Props) => {
  let pinIconColor = 'var(--secondary-text-color)';

  if (isPinned && position === 'leftPane') {
    pinIconColor = 'var(--secondary-text-color-on-hover)';
  } else if (isPinned && position === 'rightPane') {
    pinIconColor = 'var(--brand-color-2)';
  }

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
};

ActionsView.defaultProps = {
  addIconTooltipText: '',
  shouldShowPinIcon: false,
  isPinned: false,
  handlePinIconClick: _.noop
};

export default ActionsView;
