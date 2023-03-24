import { MeasureService } from './MeasureService';
import type { Measure } from '../state/types/Measure';
import { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import { Dimension } from '../../../dimensionselector/model/state/types/Dimension';

export default class MeasureServiceImpl implements MeasureService {
  latency = 1000;

  fetchMeasures(dataSource: DataSource, dimension: Dimension | undefined): Promise<Measure[]> {
    return new Promise<Measure[]>((resolve) => {
      setTimeout(() => {
        if (dataSource.type === 'aggregated' && (dimension?.name === 'Cell' || dimension?.name === 'eNodeB name')) {
          resolve([
            {
              name: 'Handovers',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'Failed handovers',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            }
          ]);
        } else if (dataSource.name === 'CNI Call Reports') {
          resolve([
            {
              name: 'Call duration',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'Setup duration',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'Handovers',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Failed handovers',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            }
          ]);
        } else {
          resolve([
            {
              name: 'Setup attempts',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'Setup failures',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'Dropped calls',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Handovers',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Failed handovers',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'SMS deliveries',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Failed SMS deliveries',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Throughput',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Latency',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            }
          ]);
        }
      }, this.latency);
    });
  }
}
