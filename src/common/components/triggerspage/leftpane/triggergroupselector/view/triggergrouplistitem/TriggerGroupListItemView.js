// @flow

import type { Element } from 'react';
import React from 'react';
import { List } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from '../../../../../../view/listitems/listitem/ListItemView.module.scss';
import styles2 from './TriggerGroupListItemView.module.scss';
import CountBadgeView from '../../../../../../view/countbadge/CountBadgeView';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';

type Props = {
  bestTriggerCount: number,
  intermediateTriggerCount: number,
  pageStateNamespace: TriggersPageStateNamespace,
  selectedTriggerGroups: string[],
  selectTriggerGroup: (string) => void,
  triggerGroup: string,
  worstTriggerCount: number,
};

const { listItem } = styles;
const { selected, triggerCountBadge, triggerGroupText, triggerGroupListItem } = styles2;

const TriggerGroupListItemView = ({
  bestTriggerCount,
  intermediateTriggerCount,
  pageStateNamespace,
  selectedTriggerGroups,
  selectTriggerGroup,
  triggerGroup,
  worstTriggerCount,
}: Props): Element<any> => {
  const className = classNames(listItem, triggerGroupListItem, {
    [selected]: selectedTriggerGroups.includes(triggerGroup),
  });

  return (
    <List.Item className={className} onClick={() => selectTriggerGroup(triggerGroup)}>
      <span className={triggerGroupText}>{triggerGroup}</span>
      <CountBadgeView className={triggerCountBadge} color="red" count={worstTriggerCount} />
      <CountBadgeView
        className={triggerCountBadge}
        color={pageStateNamespace === 'alertsPage' ? 'orange' : 'yellow'}
        count={intermediateTriggerCount}
      />
      <CountBadgeView
        className={triggerCountBadge}
        color={pageStateNamespace === 'goalsPage' ? 'yellow' : 'green'}
        count={bestTriggerCount}
      />
    </List.Item>
  );
};

export default TriggerGroupListItemView;
