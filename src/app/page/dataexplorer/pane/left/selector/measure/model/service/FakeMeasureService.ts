import { MeasureService } from './MeasureService';
import type { Measure } from '../state/types/Measure';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

export default class MeasureServiceImpl implements MeasureService {
  latency = 1000;

  fetchMeasures(selectedChart: Chart): Promise<Measure[]> {
    return new Promise<Measure[]>((resolve) => {
      setTimeout(() => {
        if (
          selectedChart.dataSource.type === 'aggregated' &&
          selectedChart.selectedDimensions.length === 1 &&
          (selectedChart.selectedDimensions[0].dimension.name === 'Cell' ||
            selectedChart.selectedDimensions[0].dimension.name === 'eNodeB')
        ) {
          resolve([
            {
              name: 'Handovers',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Handover failure %',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            }
          ]);
        } else if (selectedChart.dataSource.name === 'CNI Call Reports') {
          resolve([
            {
              name: 'Call duration',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Setup duration',
              expression: 'measure',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
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
              unit: 'none'
            },
            {
              name: 'Setup failure %',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
            },
            {
              name: 'Call drop %',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
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
              name: 'Handover failure %',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
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
              name: 'SMS delivery failure %',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'percent'
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
              name: 'Throughput lower bound',
              expression: '',
              isString: false,
              isTimestamp: false,
              isDate: false,
              unit: 'none'
            },
            {
              name: 'Throughput upper bound',
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
