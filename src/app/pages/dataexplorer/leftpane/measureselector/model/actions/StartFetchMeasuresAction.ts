import { Inject } from 'noicejs';
import AbstractMeasureSelectorAction from './AbstractMeasureSelectorAction';
import type { MeasureService } from '../service/MeasureService';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';
import type { Measure } from '../state/types/Measure';
import { Chart } from '../../../../../../common/components/chartarea/chart/model/state/Chart';

class FinishFetchMeasuresAction extends AbstractMeasureSelectorAction {
  constructor(private readonly measures: Measure[]) {
    super();
  }

  perform(currentState: MeasureSelectorState): MeasureSelectorState {
    const newState = {
      ...currentState,
      measures: this.measures,
      isFetchingMeasures: false
    };

    return newState;
  }
}

type ConstructorArgs = {
  measureService: MeasureService;
  selectedChart: Chart;
};

@Inject('measureService')
class StartFetchMeasuresAction extends AbstractMeasureSelectorAction {
  readonly measureService: MeasureService;

  readonly selectedChart: Chart;

  constructor({ measureService, selectedChart }: ConstructorArgs) {
    super();
    this.measureService = measureService;
    this.selectedChart = selectedChart;
  }

  perform(currentState: MeasureSelectorState): MeasureSelectorState {
    this.measureService
      .fetchMeasures(this.selectedChart)
      .then((measures: Measure[]) => this.dispatch(new FinishFetchMeasuresAction(measures)));

    const newState = {
      ...currentState,
      isFetchingMeasures: true
    };

    return newState;
  }
}

export default StartFetchMeasuresAction;
