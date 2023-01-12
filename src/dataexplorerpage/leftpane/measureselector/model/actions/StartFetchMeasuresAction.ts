import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils';
import AbstractMeasureSelectorAction from './AbstractMeasureSelectorAction';
import MeasureService from '../service/MeasureService';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';
import type { DataSource } from '../../../../../common/model/state/datasource/DataSource';
import type { Measure } from '../state/entities/Measure';
import AbstractMeasureSelectorDispatchingAction from './AbstractMeasureSelectorDispatchingAction';

class FinishFetchMeasuresAction extends AbstractMeasureSelectorAction {
  constructor(private readonly measures: Measure[]) {
    super();
  }

  performActionAndReturnNewState(currentState: MeasureSelectorState): MeasureSelectorState {
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
  dispatchAction: DispatchAction;
  dataSource: DataSource;
};

@Inject('measureService')
class StartFetchMeasuresAction extends AbstractMeasureSelectorDispatchingAction {
  readonly measureService: MeasureService;

  readonly dataSource: DataSource;

  constructor({ measureService, dispatchAction, dataSource }: ConstructorArgs) {
    super(dispatchAction);
    this.measureService = measureService;
    this.dataSource = dataSource;
  }

  performActionAndReturnNewState(currentState: MeasureSelectorState): MeasureSelectorState {
    this.measureService
      .fetchMeasures(this.dataSource)
      .then((measures: Measure[]) => this.dispatchAction(new FinishFetchMeasuresAction(measures)));

    const newState = {
      ...currentState,
      isFetchingMeasures: true
    };

    return newState;
  }
}

export default StartFetchMeasuresAction;
