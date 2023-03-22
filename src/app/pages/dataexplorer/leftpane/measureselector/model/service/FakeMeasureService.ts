import { MeasureService } from './MeasureService';
import type { Measure } from '../state/types/Measure';
import { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';

export default class MeasureServiceImpl implements MeasureService {
  latency = 1000;

  fetchMeasures(dataSource: DataSource): Promise<Measure[]> {
    return new Promise<Measure[]>((resolve) => {
      setTimeout(() => {
        if (dataSource.name === 'CNI Call Reports') {
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
              name: 'measure1',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'measure2',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'measure3',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'measure4',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'measure5',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'measure6',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'measure7',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'measure8',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'measure9',
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
