import { Inject } from 'noicejs';
import AbstractDimensionSelectorAction from './AbstractDimensionSelectorAction';
import type { DimensionService } from '../service/DimensionService';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';
import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Dimension } from '../state/entities/Dimension';

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
};

@Inject('dimensionService')
class StartFetchDimensionsAction extends AbstractDimensionSelectorAction {
  readonly dimensionService: DimensionService;

  readonly dataSource: DataSource;

  constructor({ dimensionService, dataSource }: ConstructorArgs) {
    super();
    this.dimensionService = dimensionService;
    this.dataSource = dataSource;
  }

  perform(currentState: DimensionSelectorState): DimensionSelectorState {
    this.dimensionService
      .fetchDimensions(this.dataSource)
      .then((dimensions: Dimension[]) => this.dispatch(new FinishFetchDimensionsAction(dimensions)));

    const newState = {
      ...currentState,
      isFetchingDimensions: true
    };

    return newState;
  }
}

export default StartFetchDimensionsAction;
