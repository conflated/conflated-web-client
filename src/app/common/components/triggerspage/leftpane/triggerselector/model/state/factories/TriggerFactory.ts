import _ from 'lodash';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import type { Trigger } from '../types/Trigger';
import type { TriggersPageStateNamespace } from '../../../../../model/state/TriggersPageStateNamespace';

export default class TriggerFactory {
  static createTriggers(
    triggersDataTableChart: Chart,
    selectedTriggerLabels: string[],
    searchedValue: string,
    stateNamespace: TriggersPageStateNamespace
  ): Trigger[] {
    const [triggerNameData, triggerGroupData, severityOrStatusData] =
      triggersDataTableChart.chartData.getTriggerData(stateNamespace);

    const triggersWithSelectedTriggerLabels = triggerNameData
      .filter((triggerName: string, index: number) =>
        selectedTriggerLabels.some((selectedTriggerGroup) =>
          triggerGroupData[index]
            .split(',')
            .map((label: string) => label.trim())
            .includes(selectedTriggerGroup)
        )
      )
      .filter((triggerName: string) => !searchedValue || (searchedValue && triggerName.includes(searchedValue)));

    console.log(triggersWithSelectedTriggerLabels);

    const triggerNameToTriggerCountMap = _.countBy(triggersWithSelectedTriggerLabels);

    return Object.entries(triggerNameToTriggerCountMap).map(([triggerName, triggerCount]) => ({
      name: triggerName,
      count: triggerCount,
      severity: severityOrStatusData[triggerNameData.indexOf(triggerName)]
    }));
  }
}
