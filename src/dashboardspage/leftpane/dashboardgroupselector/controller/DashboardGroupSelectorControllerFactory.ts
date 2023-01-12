import { ControllerFactory } from 'oo-redux-utils';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';

export default class DashboardGroupSelectorControllerFactory extends ControllerFactory {
  toggleShouldShowDashboardsPageLeftPanePermanently() {
    this.dispatchAction(new ToggleShouldShowPagePanePermanentlyAction('dashboardsPage', 'leftPane'));
  }

  createController() {
    return {
      toggleShouldShowDashboardsPageLeftPanePermanently: this.toggleShouldShowDashboardsPageLeftPanePermanently
    };
  }
}
