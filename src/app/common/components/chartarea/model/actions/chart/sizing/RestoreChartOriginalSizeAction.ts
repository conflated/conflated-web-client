import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import { ChartAreaState } from '../../../state/ChartAreaState';

export default class RestoreChartOriginalSizeAction extends AbstractChartAreaAction {
  perform(currentState: ChartAreaState): ChartAreaState {
    const { previousLayout } = currentState;

    if (previousLayout) {
      return {
        ...currentState,
        layout: previousLayout,
        maximizedChart: null
      };
    }

    return currentState;
  }
}
