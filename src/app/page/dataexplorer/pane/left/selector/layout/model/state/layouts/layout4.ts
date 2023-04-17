import type { GridItems } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItems';
import Constants from '../../../../../../../../../common/Constants';

const layout4: GridItems = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '2',
    x: 0,
    y: Constants.GRID_ROW_COUNT / 3,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '3',
    x: 0,
    y: (2 * Constants.GRID_ROW_COUNT) / 3,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 3
  }
];

export default layout4;
