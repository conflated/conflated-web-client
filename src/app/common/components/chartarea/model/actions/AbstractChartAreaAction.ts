import { AbstractAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../state/namespace/ChartAreaPageStateNamespace';

export default class AbstractChartAreaAction extends AbstractAction<ChartAreaState, ChartAreaPageStateNamespace> {}
