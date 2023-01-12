// @flow

import _ from 'lodash';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import type { Trigger } from './Trigger';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';

export default class TriggerFactory {
  static createTrigger(
    triggersDataTableChart: Chart,
    selectedTriggerGroups: string[],
    searchedValue: string,
    stateNamespace: TriggersPageStateNamespace
  ): Trigger[] {
    const [
      triggerNameData,
      triggerGroupData,
      severityOrStatusData
    ] = triggersDataTableChart.chartData.getTriggerData(stateNamespace);

    const triggersInSelectedTriggerGroups = triggerNameData
      .filter((triggerName: string, index: number) => selectedTriggerGroups.includes(triggerGroupData[index]))
      .filter(
        (triggerName: string) =>
          searchedValue.length === 0 || (searchedValue.length > 0 && triggerName.includes(searchedValue))
      );

    const triggerNameToTriggerCountMap = _.countBy(triggersInSelectedTriggerGroups);

    return Object.entries(triggerNameToTriggerCountMap).map(([triggerName, triggerCount]: [string, any]) => ({
      name: triggerName,
      count: triggerCount,
      severity: severityOrStatusData[triggerNameData.indexOf(triggerName)]
    }));
  }
}
