import { DimensionService } from './DimensionService';
import type { Dimension } from '../state/types/Dimension';
import { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import { Measure } from '../../../measureselector/model/state/types/Measure';

export default class DimensionServiceImpl implements DimensionService {
  latency = 1000;

  fetchDimensions(dataSource: DataSource, measure: Measure | undefined): Promise<Dimension[]> {
    return new Promise<Dimension[]>((resolve) => {
      setTimeout(() => {
        if (
          (dataSource.type === 'aggregated' && measure?.name === 'Handovers') ||
          measure?.name === 'Failed handovers'
        ) {
          resolve([
            {
              name: 'Cell',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            },
            {
              name: 'eNodeB',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            },
            {
              name: 'eNodeB name',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            }
          ]);
        } else {
          resolve([
            {
              name: 'Cell',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            },
            {
              name: 'Product category',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            },
            {
              name: 'Timestamp',
              expression: '',
              isTimestamp: true,
              isDate: false,
              isString: false,
              unit: 'none'
            },
            {
              name: 'Latitude',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: false,
              unit: 'none'
            },
            {
              name: 'Longitude',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: false,
              unit: 'none'
            },
            {
              name: 'eNodeB name',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            },
            {
              name: 'Date',
              expression: '',
              isTimestamp: false,
              isDate: true,
              isString: false,
              unit: 'none'
            },
            {
              name: 'Dimension8',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: false,
              unit: 'none'
            },
            {
              name: 'Dimension9',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: false,
              unit: 'none'
            }
          ]);
        }
      }, this.latency);
    });
  }
}
