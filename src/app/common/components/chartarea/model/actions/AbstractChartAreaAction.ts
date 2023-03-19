import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { ChartAreaState } from '../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../state/types/ChartAreaStateNamespace';
import store from '../../../../../../store/store';

export default abstract class AbstractChartAreaAction extends AbstractCompositeAction<
  ChartAreaState,
  ChartAreaStateNamespace
> {
  constructor(stateNamespace: ChartAreaStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
