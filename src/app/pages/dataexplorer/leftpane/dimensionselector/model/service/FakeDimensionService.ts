import { DimensionService } from './DimensionService';
import type { Dimension } from '../state/types/Dimension';

export default class DimensionServiceImpl implements DimensionService {
  latency = 1000;

  fetchDimensions(): Promise<Dimension[]> {
    return new Promise<Dimension[]>((resolve) => {
      setTimeout(() => {
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
      }, this.latency);
    });
  }
}
