import { ControllerFactory } from 'oo-redux-utils';
import HidePagePaneAction from '../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';

export default class DataExplorerPageRightPaneControllerFactory extends ControllerFactory {
  hideDataExplorerPageRightPane() {
    this.dispatchAction(new HidePagePaneAction('dataExplorerPage', 'rightPane'));
  }

  createController = () => ({
    hideDataExplorerPageRightPane: this.hideDataExplorerPageRightPane
  });
}
