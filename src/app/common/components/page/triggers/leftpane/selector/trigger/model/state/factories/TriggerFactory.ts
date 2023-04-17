import _ from 'lodash';
import type { Chart } from '../../../../../../../../chartarea/chart/model/state/Chart';
import type { Trigger } from '../types/Trigger';
import type { TriggersPageStateNamespace } from '../../../../../../model/state/TriggersPageStateNamespace';

export default class TriggerFactory {
  static createTriggers(
    triggersDataTableChart: Chart,
    selectedTriggerLabels: string[],
    searchedValue: string,
    stateNamespace: TriggersPageStateNamespace
  ): Trigger[] {
    const [triggerNames, triggerLabelsForTrigger, severitiesOrStatuses] =
      triggersDataTableChart.data.getTriggerData(stateNamespace);

    const triggerNamesWithSelectedTriggerLabels = triggerNames
      .filter((triggerName: string, index: number) =>
        selectedTriggerLabels.length > 0
          ? selectedTriggerLabels.some((selectedTriggerLabel) =>
              triggerLabelsForTrigger[index]
                .split(',')
                .map((triggerLabel: string) => triggerLabel.trim())
                .includes(selectedTriggerLabel)
            )
          : true
      )
      .filter((triggerName: string) => !searchedValue || (searchedValue && triggerName.includes(searchedValue)));

    const triggerNameToTriggerCountMap = _.countBy(triggerNamesWithSelectedTriggerLabels);

    return Object.entries(triggerNameToTriggerCountMap).map(([name, count]) => ({
      name,
      count,
      severity: severitiesOrStatuses[triggerNames.indexOf(name)]
    }));
  }
}
