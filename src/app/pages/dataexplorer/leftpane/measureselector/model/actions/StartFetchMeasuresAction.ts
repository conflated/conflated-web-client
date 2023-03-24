import { Inject } from 'noicejs';
import AbstractMeasureSelectorAction from './AbstractMeasureSelectorAction';
import type { MeasureService } from '../service/MeasureService';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';
import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Measure } from '../state/types/Measure';
import { Dimension } from '../../../dimensionselector/model/state/types/Dimension';

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
  dimension: Dimension | undefined;
};

@Inject('measureService')
class StartFetchMeasuresAction extends AbstractMeasureSelectorAction {
  readonly measureService: MeasureService;

  readonly dataSource: DataSource;

  readonly dimension: Dimension | undefined;

  constructor({ measureService, dataSource, dimension }: ConstructorArgs) {
    super();
    this.measureService = measureService;
    this.dataSource = dataSource;
    this.dimension = dimension;
  }

  perform(currentState: MeasureSelectorState): MeasureSelectorState {
    this.measureService
      .fetchMeasures(this.dataSource, this.dimension)
      .then((measures: Measure[]) => this.dispatch(new FinishFetchMeasuresAction(measures)));

    const newState = {
      ...currentState,
      isFetchingMeasures: true
    };

    return newState;
  }
}

export default StartFetchMeasuresAction;
