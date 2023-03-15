import React from 'react';
import { List, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from '../../../../../../view/listitems/listitem/ListItemView.module.scss';
import styles2 from './TriggerSelectorListItemView.module.scss';
import CountBadgeView from '../../../../../../view/countbadge/CountBadgeView';
import TriggerSelectorListItemBadgeColorFactory from './badgecolorfactory/TriggerSelectorListItemBadgeColorFactory';

type Props = {
  selectedTriggers: string[];
  selectTrigger: (trigger: string) => void;
  severity: string;
  trigger: string;
  triggerCount: number;
};

const { selected } = styles;
const { actionIcon, triggerCountBadge, triggerListItem, triggerText } = styles2;

const TriggerSelectorListItemView = ({ selectedTriggers, selectTrigger, severity, trigger, triggerCount }: Props) => {
  const badgeColor = TriggerSelectorListItemBadgeColorFactory.createBadgeColor(severity);
  const className = classNames(styles.listItem, triggerListItem, { [selected]: selectedTriggers.includes(trigger) });

  return (
    <List.Item className={className} onClick={() => selectTrigger(trigger)}>
      <span className={triggerText}>{trigger}</span>
      <Popup
        content="Add to favorites"
        inverted
        trigger={<List.Icon className={`${styles.listItemActionIcon} ${actionIcon}`} name="star" onClick={() => {}} />}
      />
      {severity !== 'Info' && <CountBadgeView className={triggerCountBadge} color={badgeColor} count={triggerCount} />}
    </List.Item>
  );
};

export default TriggerSelectorListItemView;