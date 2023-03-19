import React from 'react';
import { List, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from '../../../../../../../view/listitems/listitem/ListItemView.module.scss';
import styles2 from './TriggerLabelSelectorListItemView.module.scss';
import CountBadgeView from '../../../../../../../view/countbadge/CountBadgeView';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

type Props = {
  bestTriggerCount: number;
  intermediateTriggerCount: number;
  pageStateNamespace: TriggersPageStateNamespace;
  selectedTriggerGroups: string[];
  selectTriggerGroup: (triggerGroup: string) => void;
  triggerGroup: string;
  worstTriggerCount: number;
};

const { listItem, selected } = styles;
const { actionIcon, triggerCountBadge, triggerGroupText, triggerGroupListItem } = styles2;

const TriggerLabelSelectorListItemView = ({
  bestTriggerCount,
  intermediateTriggerCount,
  pageStateNamespace,
  selectedTriggerGroups,
  selectTriggerGroup,
  triggerGroup,
  worstTriggerCount
}: Props) => {
  const className = classNames(listItem, triggerGroupListItem, {
    [selected]: selectedTriggerGroups.includes(triggerGroup)
  });

  return (
    <List.Item className={className} onClick={() => selectTriggerGroup(triggerGroup)}>
      <span className={triggerGroupText}>{triggerGroup}</span>
      <Popup
        content="Add to favorites"
        inverted
        trigger={<List.Icon className={`${styles.listItemActionIcon} ${actionIcon}`} name="star" onClick={() => {}} />}
      />
      <CountBadgeView className={triggerCountBadge} color="red" count={worstTriggerCount} />
      <CountBadgeView
        className={triggerCountBadge}
        color={pageStateNamespace === 'alertsPage' ? 'orange' : 'yellow'}
        count={intermediateTriggerCount}
      />
      <CountBadgeView
        className={triggerCountBadge}
        color={pageStateNamespace === 'goalsPage' ? 'green' : 'yellow'}
        count={bestTriggerCount}
      />
    </List.Item>
  );
};

export default TriggerLabelSelectorListItemView;