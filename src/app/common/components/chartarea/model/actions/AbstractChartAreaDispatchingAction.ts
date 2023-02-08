import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../state/namespace/ChartAreaPageStateNamespace';

export default class AbstractChartAreaDispatchingAction extends AbstractDispatchingAction<
  ChartAreaState,
  ChartAreaPageStateNamespace
> {}
