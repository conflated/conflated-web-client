import OOReduxUtils from 'oo-redux-utils2';
import type { HeaderState } from './HeaderState';
import AbstractHeaderAction from '../actions/AbstractHeaderAction';

const initialHeaderState: HeaderState = {
  currentPage: 'dashboardsPage',
  isFullScreenModeActive: false,
  isFullScreenModeNotificationDismissed: false,
  shouldShowFullScreenModeNotification: false,
  lastDragType: ''
};

export default OOReduxUtils.createStateReducer<HeaderState>(initialHeaderState, AbstractHeaderAction);
