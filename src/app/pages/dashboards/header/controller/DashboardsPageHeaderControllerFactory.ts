import { ControllerFactory } from 'oo-redux-utils';
import ChangeDashboardSlideChangeIntervalAction from '../../model/actions/slideshow/ChangeDashboardSlideChangeIntervalAction';
import CancelDelayedDashboardsPageHeaderHideAction from '../model/actions/show/CancelDelayedDashboardsPageHeaderHideAction';
import ToggleShouldShowDashboardsPageHeaderPermanentlyAction from '../model/actions/show/ToggleShouldShowDashboardsPageHeaderPermanentlyAction';
import ToggleDashboardsSlideShowPlayAction from '../../model/actions/slideshow/ToggleDashboardsSlideShowPlayAction';
import HideDashboardsPageHeaderAction from '../model/actions/show/HideDashboardsPageHeaderAction';
import SetDashboardsPageHeaderDelayedHideTimeoutIdAction from '../model/actions/show/SetDashboardsPageHeaderDelayedHideTimeoutIdAction';

export default class DashboardsPageHeaderControllerFactory extends ControllerFactory {
  hideDashboardsHeaderDelayed(dashboardHeaderHideDelayInMillis: number) {
    const timeoutId = setTimeout(
      () => this.dispatchAction(new HideDashboardsPageHeaderAction()),
      dashboardHeaderHideDelayInMillis
    );

    this.dispatchAction(new SetDashboardsPageHeaderDelayedHideTimeoutIdAction(timeoutId));
  }

  toggleDashboardsSlideShowPlay() {
    this.dispatchAction(new ToggleDashboardsSlideShowPlayAction(this.dispatchAction));
  }

  changeDashboardsSlideChangeInterval(dashboardSlideChangeIntervalInSecsStr: string) {
    this.dispatchAction(
      new ChangeDashboardSlideChangeIntervalAction(this.dispatchAction, dashboardSlideChangeIntervalInSecsStr)
    );
  }

  cancelDelayedDashboardsHeaderHide() {
    this.dispatchAction(new CancelDelayedDashboardsPageHeaderHideAction());
  }

  toggleShouldShowDashboardsHeaderPermanently() {
    this.dispatchAction(new ToggleShouldShowDashboardsPageHeaderPermanentlyAction());
  }

  createController() {
    return {
      hideDashboardsHeaderDelayed: this.hideDashboardsHeaderDelayed,
      toggleDashboardsSlideShowPlay: this.toggleDashboardsSlideShowPlay,
      changeDashboardsSlideChangeInterval: this.changeDashboardsSlideChangeInterval,
      cancelDelayedDashboardsHeaderHide: this.cancelDelayedDashboardsHeaderHide,
      toggleShouldShowDashboardsHeaderPermanently: this.toggleShouldShowDashboardsHeaderPermanently
    };
  }
}
