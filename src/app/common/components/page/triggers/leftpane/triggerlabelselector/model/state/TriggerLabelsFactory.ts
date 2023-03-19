import _ from 'lodash';
import type { TriggerLabel } from './types/TriggerLabel';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

export default class TriggerLabelsFactory {
  static createTriggerLabels(
    triggersDataTableChart: Chart,
    searchedValue: string,
    stateNamespace: TriggersPageStateNamespace
  ): TriggerLabel[] {
    const [triggerGroupNameData, severityOrStatusData] =
      triggersDataTableChart.chartData.getTriggerGroupData(stateNamespace);

    return _.uniq(
      triggerGroupNameData.flatMap((triggerGroupName: string) => triggerGroupName.split(',').map((tgn) => tgn.trim()))
    )
      .filter(
        (triggerGroupName: string) =>
          searchedValue.length === 0 || (searchedValue.length > 0 && triggerGroupName.includes(searchedValue))
      )
      .map((triggerGroupName: string) => {
        const worstTriggers = severityOrStatusData.filter(
          (severityOrStatus: string, index: number) =>
            triggerGroupNameData[index].includes(triggerGroupName) &&
            ((stateNamespace === 'alertsPage' && severityOrStatus === 'Critical') ||
              (stateNamespace === 'goalsPage' && severityOrStatus === 'Far below target'))
        );

        const intermediateTriggers = severityOrStatusData.filter(
          (severityOrStatus: string, index: number) =>
            triggerGroupNameData[index].includes(triggerGroupName) &&
            ((stateNamespace === 'alertsPage' && severityOrStatus === 'Major') ||
              (stateNamespace === 'goalsPage' && severityOrStatus === 'Below target'))
        );

        const bestTriggers = severityOrStatusData.filter(
          (severityOrStatus: string, index: number) =>
            triggerGroupNameData[index].includes(triggerGroupName) &&
            ((stateNamespace === 'alertsPage' && severityOrStatus === 'Minor') ||
              (stateNamespace === 'goalsPage' &&
                (severityOrStatus === 'On target' || severityOrStatus === 'Above target')))
        );

        return {
          name: triggerGroupName,
          worstTriggerCount: worstTriggers.length,
          intermediateTriggerCount: intermediateTriggers.length,
          bestTriggerCount: bestTriggers.length
        };
      })
      .sort(
        (triggerGroup1: TriggerLabel, triggerGroup2: TriggerLabel) =>
          3 * triggerGroup2.worstTriggerCount +
          2 * triggerGroup2.intermediateTriggerCount +
          triggerGroup2.bestTriggerCount -
          (3 * triggerGroup1.worstTriggerCount +
            2 * triggerGroup1.intermediateTriggerCount +
            triggerGroup1.bestTriggerCount)
      );
  }
}
