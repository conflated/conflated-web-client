import { DimensionService } from './DimensionService';
import type { Dimension } from '../state/types/Dimension';

export default class DimensionServiceImpl implements DimensionService {
  latency = 1000;

  fetchDimensions(): Promise<Dimension[]> {
    return new Promise<Dimension[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'dimension1',
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
            name: 'timestamp',
            expression: '',
            isTimestamp: true,
            isDate: false,
            isString: false,
            unit: 'none'
          },
          {
            name: 'latitude',
            expression: '',
            isTimestamp: false,
            isDate: false,
            isString: false,
            unit: 'none'
          },
          {
            name: 'longitude',
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
            name: 'date',
            expression: '',
            isTimestamp: false,
            isDate: true,
            isString: false,
            unit: 'none'
          },
          {
            name: 'dimension8',
            expression: '',
            isTimestamp: false,
            isDate: false,
            isString: false,
            unit: 'none'
          },
          {
            name: 'dimension9',
            expression: '',
            isTimestamp: false,
            isDate: false,
            isString: false,
            unit: 'none'
          }
        ]);
      }, this.latency);
    });
  }
}
