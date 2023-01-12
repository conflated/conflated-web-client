import type { Layout } from '../../../../../../common/components/chartarea/model/state/types/Layout';
import Constants from '../../../../../../common/Constants';

const layout11: Layout = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT
  },
  {
    i: '2',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '3',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: Constants.GRID_ROW_COUNT / 3,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '4',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: (2 * Constants.GRID_ROW_COUNT) / 3,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 3
  }
];

export default layout11;
