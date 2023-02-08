import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils2';
import AbstractDimensionSelectorAction from './AbstractDimensionSelectorAction';
import type { DimensionService } from '../service/DimensionService';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';
import type { DataSource } from '../../../../../../common/model/state/datasource/DataSource';
import type { Dimension } from '../state/entities/Dimension';
import AbstractDimensionSelectorDispatchingAction from './AbstractDimensionSelectorDispatchingAction';

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
  dispatchAction: DispatchAction;
  dataSource: DataSource;
};

@Inject('dimensionService')
class StartFetchDimensionsAction extends AbstractDimensionSelectorDispatchingAction {
  readonly dimensionService: DimensionService;

  readonly dataSource: DataSource;

  constructor({ dimensionService, dispatchAction, dataSource }: ConstructorArgs) {
    super(dispatchAction);
    this.dimensionService = dimensionService;
    this.dataSource = dataSource;
  }

  perform(currentState: DimensionSelectorState): DimensionSelectorState {
    this.dimensionService
      .fetchDimensions(this.dataSource)
      .then((dimensions: Dimension[]) => this.dispatchAction(new FinishFetchDimensionsAction(dimensions)));

    const newState = {
      ...currentState,
      isFetchingDimensions: true
    };

    return newState;
  }
}

export default StartFetchDimensionsAction;
