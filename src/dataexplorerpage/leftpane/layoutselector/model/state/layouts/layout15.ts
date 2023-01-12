import type { Layout } from '../../../../../../common/components/chartarea/model/state/types/Layout';
import Constants from '../../../../../../common/Constants';

const layout15: Layout = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '2',
    x: Constants.GRID_COLUMN_COUNT / 3,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '3',
    x: (2 * Constants.GRID_COLUMN_COUNT) / 3,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '4',
    x: 0,
    y: Constants.GRID_ROW_COUNT / 3,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '5',
    x: Constants.GRID_COLUMN_COUNT / 3,
    y: Constants.GRID_ROW_COUNT / 3,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '6',
    x: (2 * Constants.GRID_COLUMN_COUNT) / 3,
    y: Constants.GRID_ROW_COUNT / 3,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '7',
    x: 0,
    y: (2 * Constants.GRID_ROW_COUNT) / 3,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '8',
    x: Constants.GRID_COLUMN_COUNT / 3,
    y: (2 * Constants.GRID_ROW_COUNT) / 3,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '9',
    x: (2 * Constants.GRID_COLUMN_COUNT) / 3,
    y: (2 * Constants.GRID_ROW_COUNT) / 3,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 3
  }
];

export default layout15;
