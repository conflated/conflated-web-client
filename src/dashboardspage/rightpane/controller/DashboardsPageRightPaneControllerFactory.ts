import { ControllerFactory } from 'oo-redux-utils';
import HidePagePaneAction from '../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';

export default class DashboardsPageRightPaneControllerFactory extends ControllerFactory {
  hideDashboardsPageRightPane() {
    this.dispatchAction(new HidePagePaneAction('dashboardsPage', 'rightPane'));
  }

  createController() {
    return {
      hideDashboardsPageRightPane: this.hideDashboardsPageRightPane
    };
  }
}
