import { AbstractAction } from 'oo-redux-utils';
import type { ChartAreaState } from '../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../state/namespace/ChartAreaPageStateNamespace';

export default class AbstractChartAreaAction extends AbstractAction<ChartAreaState, ChartAreaPageStateNamespace> {}
