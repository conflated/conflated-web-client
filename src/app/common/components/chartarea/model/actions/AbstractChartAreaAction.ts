import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../state/types/ChartAreaPageStateNamespace';
import dispatch from '../../../../../../store/dispatch';

export default abstract class AbstractChartAreaAction extends AbstractDispatchingAction<
  ChartAreaState,
  ChartAreaPageStateNamespace
> {
  constructor(stateNamespace: ChartAreaPageStateNamespace) {
    super(stateNamespace, dispatch);
  }
}
