import { ControllerFactory } from 'oo-redux-utils';
import HidePagePaneAction from '../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';

export default class DashboardsPageLeftPaneControllerFactory extends ControllerFactory {
  hideDashboardsPageLeftPane() {
    this.dispatchAction(new HidePagePaneAction('dashboardsPage', 'leftPane'));
  }

  createController() {
    return {
      hideDashboardsPageLeftPane: this.hideDashboardsPageLeftPane
    };
  }
}
