import type { Layout } from '../../../../../../../common/components/chartarea/model/state/types/Layout';
import Constants from '../../../../../../../common/Constants';

const layout5: Layout = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT
  },
  {
    i: '2',
    x: Constants.GRID_COLUMN_COUNT / 3,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT
  },
  {
    i: '3',
    x: (2 * Constants.GRID_COLUMN_COUNT) / 3,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT
  }
];

export default layout5;
