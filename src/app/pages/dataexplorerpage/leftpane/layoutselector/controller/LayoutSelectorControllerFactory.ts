import { ControllerFactory } from 'oo-redux-utils';
import ToggleLayoutLockedAction from '../model/actions/ToggleLayoutLockedAction';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import type { Layout } from '../../../../../common/components/chartarea/model/state/types/Layout';
import ChangeChartAreaLayoutAction from '../../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAction';

export default class LayoutSelectorControllerFactory extends ControllerFactory {
  selectLayout(layout: Layout) {
    this.dispatchAction(new ChangeChartAreaLayoutAction('dataExplorerPage', layout));
  }

  toggleLayoutLocked() {
    this.dispatchAction(new ToggleLayoutLockedAction());
  }

  toggleShouldShowDataExplorerPageLeftPanePermanently() {
    this.dispatchAction(new ToggleShouldShowPagePanePermanentlyAction('dataExplorerPage', 'leftPane'));
  }

  createController = () => ({
    selectLayout: this.selectLayout,
    toggleLayoutLocked: this.toggleLayoutLocked,
    toggleShouldShowDataExplorerPageLeftPanePermanently: this.toggleShouldShowDataExplorerPageLeftPanePermanently
  });
}
