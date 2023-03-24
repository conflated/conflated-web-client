import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Measure } from '../state/types/Measure';
import { Dimension } from '../../../dimensionselector/model/state/types/Dimension';

export interface MeasureService {
  fetchMeasures(dataSource: DataSource, dimension: Dimension | undefined): Promise<Measure[]>;
}
