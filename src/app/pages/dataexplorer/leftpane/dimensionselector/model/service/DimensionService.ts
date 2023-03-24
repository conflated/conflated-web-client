import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Dimension } from '../state/types/Dimension';
import { Measure } from '../../../measureselector/model/state/types/Measure';

export interface DimensionService {
  fetchDimensions(dataSource: DataSource, measure: Measure | undefined): Promise<Dimension[]>;
}
