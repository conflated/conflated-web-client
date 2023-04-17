import Constants from '../../../../../../../../../common/Constants';
import { GridItem } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItem';

const layout5: GridItem[] = [
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
    w: Constants.GRID_COLUMN_COUNT / 3,
    h: Constants.GRID_ROW_COUNT
  }
];

export default layout5;
