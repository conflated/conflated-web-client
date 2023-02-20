import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import type { Measure } from '../state/entities/Measure';

export interface MeasureService {
  fetchMeasures(dataSource: DataSource): Promise<Measure[]>;
}
