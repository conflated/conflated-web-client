import Constants from '../../../../../../../../../common/Constants';
import { GridItem } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItem';

const layout13: GridItem[] = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '2',
    x: 0,
    y: Constants.GRID_ROW_COUNT / 2,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '3',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '4',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: Constants.GRID_ROW_COUNT / 3,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 3
  },
  {
    i: '5',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: (2 * Constants.GRID_ROW_COUNT) / 3,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 3
  }
];

export default layout13;
