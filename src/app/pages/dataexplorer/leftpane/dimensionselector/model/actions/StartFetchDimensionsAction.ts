import { Inject } from 'noicejs';
import AbstractDimensionSelectorAction from './AbstractDimensionSelectorAction';
import type { DimensionService } from '../service/DimensionService';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';
import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Dimension } from '../state/types/Dimension';
import { Measure } from '../../../measureselector/model/state/types/Measure';

class FinishFetchDimensionsAction extends AbstractDimensionSelectorAction {
  constructor(private readonly dimensions: Dimension[]) {
    super();
  }

  perform(currentState: DimensionSelectorState): DimensionSelectorState {
    const newState = {
      ...currentState,
      dimensions: this.dimensions,
      isFetchingDimensions: false
    };

    return newState;
  }
}

type ConstructorArgs = {
  dimensionService: DimensionService;
  dataSource: DataSource;
  measure: Measure | undefined;
};

@Inject('dimensionService')
class StartFetchDimensionsAction extends AbstractDimensionSelectorAction {
  readonly dimensionService: DimensionService;

  readonly dataSource: DataSource;

  readonly measure: Measure | undefined;

  constructor({ dimensionService, dataSource, measure }: ConstructorArgs) {
    super();
    this.dimensionService = dimensionService;
    this.dataSource = dataSource;
    this.measure = measure;
  }

  perform(currentState: DimensionSelectorState): DimensionSelectorState {
    this.dimensionService
      .fetchDimensions(this.dataSource, this.measure)
      .then((dimensions: Dimension[]) => this.dispatch(new FinishFetchDimensionsAction(dimensions)));

    const newState = {
      ...currentState,
      isFetchingDimensions: true
    };

    return newState;
  }
}

export default StartFetchDimensionsAction;
