import { MeasureService } from './MeasureService';
import type { Measure } from '../state/entities/Measure';

export default class MeasureServiceImpl implements MeasureService {
  latency = 1000;

  fetchMeasures(): Promise<Measure[]> {
    return new Promise<Measure[]>((resolve) => {
      setTimeout(() => {
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
      }, this.latency);
    });
  }
}
