import { Inject } from 'noicejs';
import AbstractMeasureSelectorAction from './AbstractMeasureSelectorAction';
import type { MeasureService } from '../service/MeasureService';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';
import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Measure } from '../state/entities/Measure';

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
  dataSource: DataSource;
};

@Inject('measureService')
class StartFetchMeasuresAction extends AbstractMeasureSelectorAction {
  readonly measureService: MeasureService;

  readonly dataSource: DataSource;

  constructor({ measureService, dataSource }: ConstructorArgs) {
    super();
    this.measureService = measureService;
    this.dataSource = dataSource;
  }

  perform(currentState: MeasureSelectorState): MeasureSelectorState {
    this.measureService
      .fetchMeasures(this.dataSource)
      .then((measures: Measure[]) => this.dispatch(new FinishFetchMeasuresAction(measures)));

    const newState = {
      ...currentState,
      isFetchingMeasures: true
    };

    return newState;
  }
}

export default StartFetchMeasuresAction;
