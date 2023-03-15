import _ from 'lodash';
import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import stopEventPropagation from '../../../../utils/stopEventPropagation';

type Props = {
  addIconTooltipText?: string;
  handlePinIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  handleReorderIconClick: () => void;
  iconClassName: string;
  isPinned?: boolean;
  position: 'leftPane' | 'rightPane';
  reorderIconTooltipText?: string;
  shouldShowPinIcon?: boolean;
  toggleShowSearchInput: (event: React.MouseEvent<HTMLElement>) => void;
  toggleMaximizeAccordion: (event: React.MouseEvent<HTMLElement>) => void;
};

const ActionsView: React.FC<Props> = ({
  addIconTooltipText,
  handlePinIconClick,
  handleReorderIconClick,
  iconClassName,
  isPinned,
  position,
  reorderIconTooltipText,
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

  const reorderIcon = (
    <Popup
      inverted
      trigger={
        <Icon className={iconClassName} name="bars" onClick={_.flow(stopEventPropagation, handleReorderIconClick)} />
      }
      content={reorderIconTooltipText}
    />
  );

  return (
    <div>
      {addIconTooltipText ? addIcon : undefined}
      {searchIcon}
      {reorderIconTooltipText ? reorderIcon : undefined}
      {maximizeIcon}
      {shouldShowPinIcon ? pinIcon : undefined}
    </div>
  );
};

ActionsView.defaultProps = {
  addIconTooltipText: '',
  handlePinIconClick: _.noop,
  isPinned: false,
  reorderIconTooltipText: undefined,
  shouldShowPinIcon: false
};

export default ActionsView;
