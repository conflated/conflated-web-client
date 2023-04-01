import { DimensionService } from './DimensionService';
import type { Dimension } from '../state/types/Dimension';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

export default class DimensionServiceImpl implements DimensionService {
  latency = 1000;

  fetchDimensions(selectedChart: Chart): Promise<Dimension[]> {
    return new Promise<Dimension[]>((resolve) => {
      setTimeout(() => {
        if (
          (selectedChart.dataSource.type === 'aggregated' &&
            ((selectedChart.selectedDimensions.length === 3 &&
              selectedChart.selectedDimensions[0].dimension.name === 'eNodeB' &&
              selectedChart.selectedDimensions[1].dimension.name === 'Cell' &&
              selectedChart.selectedDimensions[2].dimension.name === 'Error cause') ||
              (selectedChart.selectedDimensions.length === 2 &&
                selectedChart.selectedDimensions[0].dimension.name === 'eNodeB' &&
                selectedChart.selectedDimensions[1].dimension.name === 'Error cause') ||
              (selectedChart.selectedDimensions.length === 2 &&
                selectedChart.selectedDimensions[0].dimension.name === 'Cell' &&
                selectedChart.selectedDimensions[1].dimension.name === 'Error cause'))) ||
          (selectedChart.selectedDimensions.length === 1 &&
            selectedChart.selectedDimensions[0].dimension.name === 'Error cause')
        ) {
          resolve([]);
        } else if (
          selectedChart.dataSource.type === 'aggregated' &&
          selectedChart.selectedDimensions.length === 1 &&
          selectedChart.selectedDimensions[0].dimension.name === 'Cell'
        ) {
          resolve([
            {
              name: 'Error cause',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            }
          ]);
        } else if (
          selectedChart.dataSource.type === 'aggregated' &&
          selectedChart.selectedDimensions.length === 2 &&
          selectedChart.selectedDimensions[0].dimension.name === 'eNodeB' &&
          selectedChart.selectedDimensions[1].dimension.name === 'Cell'
        ) {
          resolve([
            {
              name: 'Error cause',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            }
          ]);
        } else if (
          selectedChart.dataSource.type === 'aggregated' &&
          selectedChart.selectedDimensions[0]?.dimension.name === 'eNodeB'
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
              name: 'Error cause',
              expression: '',
              isTimestamp: false,
              isDate: false,
              isString: true,
              unit: 'none'
            }
          ]);
        } else if (
          (selectedChart.dataSource.type === 'aggregated' &&
            selectedChart.selectedMeasures[0]?.measure.name === 'Handovers') ||
          selectedChart.selectedMeasures[0]?.measure.name === 'Failed handovers'
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
              name: 'Error cause',
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
              name: 'eNodeB, Cell',
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
