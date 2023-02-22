import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { ChartAreaState } from '../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../state/types/ChartAreaPageStateNamespace';
import store from '../../../../../../store/store';

export default abstract class AbstractChartAreaAction extends AbstractCompositeAction<
  ChartAreaState,
  ChartAreaPageStateNamespace
> {
  constructor(stateNamespace: ChartAreaPageStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
