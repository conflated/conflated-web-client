import type { Layout } from '../../../../../../../common/components/chartarea/model/state/types/Layout';
import Constants from '../../../../../../../common/Constants';

const layout9: Layout = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 4
  },
  {
    i: '2',
    x: 0,
    y: Constants.GRID_ROW_COUNT / 4,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 4
  },
  {
    i: '3',
    x: 0,
    y: (2 * Constants.GRID_ROW_COUNT) / 4,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 4
  },
  {
    i: '4',
    x: 0,
    y: (3 * Constants.GRID_ROW_COUNT) / 4,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 4
  }
];

export default layout9;
