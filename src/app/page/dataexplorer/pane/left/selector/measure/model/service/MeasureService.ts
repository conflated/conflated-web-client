import type { Measure } from '../state/types/Measure';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

export interface MeasureService {
  fetchMeasures(selectedChart: Chart): Promise<Measure[]>;
}
