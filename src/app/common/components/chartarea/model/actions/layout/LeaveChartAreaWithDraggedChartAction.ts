import AbstractChartAreaAction from '../AbstractChartAreaAction';
import ChangeChartAreaLayoutAndStorePreviousLayoutAction from './ChangeChartAreaLayoutAndStorePreviousLayoutAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { GridItem } from '../../state/types/GridItem';
import Constants from '../../../../../Constants';

export default class LeaveChartAreaWithDraggedChartAction extends AbstractChartAreaAction {
  perform(currentState: ChartAreaState): ChartAreaState {
    const { layout } = currentState;
    const layoutWithoutChartPlaceholder = layout.filter(({ i }: GridItem) => i !== Constants.CHART_PLACEHOLDER);

    if (layoutWithoutChartPlaceholder.length === layout.length - 1) {
      return this.performAction(
        new ChangeChartAreaLayoutAndStorePreviousLayoutAction(this.stateNamespace, []),
        currentState
      );
    }

    return currentState;
  }
}
