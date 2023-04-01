import type { Dimension } from '../state/types/Dimension';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

export interface DimensionService {
  fetchDimensions(selectedChart: Chart): Promise<Dimension[]>;
}
