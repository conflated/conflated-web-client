import Constants from '../../../../../../../../../common/Constants';
import { GridItem } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItem';

const layout2: GridItem[] = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 2
  },
  {
    i: '2',
    x: 0,
    y: Constants.GRID_ROW_COUNT / 2,
    w: Constants.GRID_COLUMN_COUNT,
    h: Constants.GRID_ROW_COUNT / 2
  }
];

export default layout2;
