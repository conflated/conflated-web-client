import Constants from '../../../../../../../../../common/Constants';
import { GridItem } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItem';

const layout9: GridItem[] = [
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
