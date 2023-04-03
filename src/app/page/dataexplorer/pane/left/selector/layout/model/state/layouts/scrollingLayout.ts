import type { Layout } from '../../../../../../../../../common/components/chartarea/model/state/types/Layout';
import Constants from '../../../../../../../../../common/Constants';

const scrollingLayout: Layout = [
  {
    i: '1',
    x: 0,
    y: 0,
    w: Constants.GRID_COLUMN_COUNT / 2,
    h: Constants.GRID_ROW_COUNT / 2
  }
];

export default scrollingLayout;
