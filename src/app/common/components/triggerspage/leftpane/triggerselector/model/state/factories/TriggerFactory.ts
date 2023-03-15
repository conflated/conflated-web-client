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
    const [triggerNames, triggerLabelsData, severitiesOrStatuses] =
      triggersDataTableChart.chartData.getTriggerData(stateNamespace);

    const triggerNamesWithSelectedTriggerLabels = triggerNames
      .filter((triggerName: string, index: number) =>
        selectedTriggerLabels.some((selectedTriggerLabel) =>
          triggerLabelsData[index]
            .split(',')
            .map((triggerLabel: string) => triggerLabel.trim())
            .includes(selectedTriggerLabel)
        )
      )
      .filter((triggerName: string) => !searchedValue || (searchedValue && triggerName.includes(searchedValue)));

    const triggerNameToTriggerCountMap = _.countBy(triggerNamesWithSelectedTriggerLabels);

    return Object.entries(triggerNameToTriggerCountMap).map(([triggerName, triggerCount]) => ({
      name: triggerName,
      count: triggerCount,
      severity: severitiesOrStatuses[triggerNames.indexOf(triggerName)]
    }));
  }
}
