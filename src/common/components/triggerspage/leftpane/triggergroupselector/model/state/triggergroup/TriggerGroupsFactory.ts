import _ from 'lodash';
import type { TriggerGroup } from './TriggerGroup';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';

export default class TriggerGroupsFactory {
  static createTriggerGroups(
    triggersDataTableChart: Chart,
    searchedValue: string,
    pageStateNamespace: TriggersPageStateNamespace
  ) {
    const [triggerGroupNameData, severityOrStatusData] =
      triggersDataTableChart.chartData.getTriggerGroupData(pageStateNamespace);

    return _.uniq(triggerGroupNameData)
      .filter(
        (triggerGroupName: string) =>
          searchedValue.length === 0 || (searchedValue.length > 0 && triggerGroupName.includes(searchedValue))
      )
      .map((triggerGroupName: string) => {
        const worstTriggers = severityOrStatusData.filter(
          (severityOrStatus: string, index: number) =>
            triggerGroupNameData[index] === triggerGroupName &&
            ((pageStateNamespace === 'alertsPage' && severityOrStatus === 'Critical') ||
              (pageStateNamespace === 'goalsPage' && severityOrStatus === 'Far below target'))
        );

        const intermediateTriggers = severityOrStatusData.filter(
          (severityOrStatus: string, index: number) =>
            triggerGroupNameData[index] === triggerGroupName &&
            ((pageStateNamespace === 'alertsPage' && severityOrStatus === 'Major') ||
              (pageStateNamespace === 'goalsPage' && severityOrStatus === 'Below target'))
        );

        const bestTriggers = severityOrStatusData.filter(
          (severityOrStatus: string, index: number) =>
            triggerGroupNameData[index] === triggerGroupName &&
            ((pageStateNamespace === 'alertsPage' && severityOrStatus === 'Minor') ||
              (pageStateNamespace === 'goalsPage' && severityOrStatus === 'On target'))
        );

        return {
          name: triggerGroupName,
          worstTriggerCount: worstTriggers.length,
          intermediateTriggerCount: intermediateTriggers.length,
          bestTriggerCount: bestTriggers.length
        };
      })
      .sort(
        (triggerGroup1: TriggerGroup, triggerGroup2: TriggerGroup) =>
          3 * triggerGroup2.worstTriggerCount +
          2 * triggerGroup2.intermediateTriggerCount +
          triggerGroup2.bestTriggerCount -
          (3 * triggerGroup1.worstTriggerCount +
            2 * triggerGroup1.intermediateTriggerCount +
            triggerGroup1.bestTriggerCount)
      );
  }
}
