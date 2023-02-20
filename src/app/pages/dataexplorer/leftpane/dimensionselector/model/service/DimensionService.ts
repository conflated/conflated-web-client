import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Dimension } from '../state/types/Dimension';

export interface DimensionService {
  fetchDimensions(dataSource: DataSource): Promise<Dimension[]>;
}
