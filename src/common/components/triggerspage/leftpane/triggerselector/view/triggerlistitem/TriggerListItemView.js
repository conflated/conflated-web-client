// @flow

import type { Element } from 'react';
import React from 'react';
import { List } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from '../../../../../../view/listitems/listitem/ListItemView.module.scss';
import styles2 from './TriggerListItemView.module.scss';
import CountBadgeView from '../../../../../../view/countbadge/CountBadgeView';
import TriggerListItemBadgeColorFactory from './badgecolorfactory/TriggerListItemBadgeColorFactory';

type Props = {
  selectedTriggers: string[],
  selectTrigger: (string) => void,
  severity: string,
  trigger: string,
  triggerCount: number,
};

const { selected, triggerCountBadge, triggerListItem, triggerText } = styles2;

const TriggerListItemView = ({
  selectedTriggers,
  selectTrigger,
  severity,
  trigger,
  triggerCount,
}: Props): Element<any> => {
  const badgeColor = TriggerListItemBadgeColorFactory.createBadgeColor(severity);
  const className = classNames(styles.listItem, triggerListItem, { [selected]: selectedTriggers.includes(trigger) });

  return (
    <List.Item className={className} onClick={() => selectTrigger(trigger)}>
      <span className={triggerText}>{trigger}</span>
      {severity === 'Info' ? undefined : (
        <CountBadgeView className={triggerCountBadge} color={badgeColor} count={triggerCount} />
      )}
    </List.Item>
  );
};

export default TriggerListItemView;
