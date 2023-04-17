import Constants from '../../../../../../../../../common/Constants';
import { GridItem } from '../../../../../../../../../common/components/chartarea/model/state/types/GridItem';

const scrollingLayout: GridItem[] = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 2
  }
];

export default scrollingLayout;
