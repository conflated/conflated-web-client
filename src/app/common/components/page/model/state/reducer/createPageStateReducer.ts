import OOReduxUtils from 'oo-redux-utils2';
import AbstractPageAction from '../../actions/AbstractPageAction';
import type { PageState } from '../PageState';
import type { PageStateNamespace } from '../namespace/PageStateNamespace';

const initialPageState: PageState = {
  shouldShowPagePaneActivatorHint: {
    leftPane: false,
    rightPane: false
  },
  shouldShowPagePane: {
    leftPane: false,
    rightPane: false
  },
  shouldShowPagePanePermanently: {
    leftPane: false,
    rightPane: false
  },
  pagePaneGutterOffset: {
    leftPane: 0,
    rightPane: 0
  },
  pagePaneGutterPositionOnDragStart: {
    leftPane: -1,
    rightPane: -1
  }
};

const dataExplorerPageInitialState = {
  ...initialPageState,
  shouldShowPagePanePermanently: {
    leftPane: true,
    rightPane: true
  }
};

export default (stateNamespace: PageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<PageState, PageStateNamespace>(
    stateNamespace === 'dataExplorerPage' ? dataExplorerPageInitialState : initialPageState,
    [AbstractPageAction, undefined],
    stateNamespace
  );
