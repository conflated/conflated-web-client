import { ControllerFactory } from 'oo-redux-utils';
import HidePagePaneAction from '../../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';

export default class DataExplorerPageLeftPaneControllerFactory extends ControllerFactory {
  createController() {
    return {
      hideDataExplorerPageLeftPane: () => this.dispatchAction(new HidePagePaneAction('dataExplorerPage', 'leftPane'))
    };
  }
}
