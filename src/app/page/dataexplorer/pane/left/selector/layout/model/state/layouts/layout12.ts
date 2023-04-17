import Constants from '../../../../../../../../../common/Constants';
import { GridItem } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItem';

const layout12: GridItem[] = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '2',
    x: Constants.GRID_COLUMN_COUNT / 2,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '3',
    x: 0,
    y: Constants.GRID_ROW_COUNT / 2,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '4',
    x: Constants.GRID_COLUMN_COUNT / 3,
    y: Constants.GRID_ROW_COUNT / 2,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '5',
    x: (2 * Constants.GRID_COLUMN_COUNT) / 3,
    y: Constants.GRID_ROW_COUNT / 2,
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT / 2
  }
];

export default layout12;
