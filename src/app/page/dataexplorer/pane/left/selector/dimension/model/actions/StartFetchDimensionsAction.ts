import { Inject } from 'noicejs';
import AbstractDimensionSelectorAction from './AbstractDimensionSelectorAction';
import type { DimensionService } from '../service/DimensionService';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';
import type { Dimension } from '../state/types/Dimension';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

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
  selectedChart: Chart;
};

@Inject('dimensionService')
class StartFetchDimensionsAction extends AbstractDimensionSelectorAction {
  readonly dimensionService: DimensionService;

  readonly selectedChart: Chart;

  constructor({ dimensionService, selectedChart }: ConstructorArgs) {
    super();
    this.dimensionService = dimensionService;

    this.selectedChart = selectedChart;
  }

  perform(currentState: DimensionSelectorState): DimensionSelectorState {
    this.dimensionService
      .fetchDimensions(this.selectedChart)
      .then((dimensions: Dimension[]) => this.dispatch(new FinishFetchDimensionsAction(dimensions)));

    return {
      ...currentState,
      isFetchingDimensions: true
    };
  }
}

export default StartFetchDimensionsAction;
