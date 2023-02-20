import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Dimension } from '../state/entities/Dimension';

export interface DimensionService {
  fetchDimensions(dataSource: DataSource): Promise<Dimension[]>;
}
