import { Controller } from 'oo-redux-utils2';
import OpenSaveAsDashboardOrReportTemplateDialogAction from '../../../saveasdashboardorreporttemplatedialog/model/actions/OpenSaveAsDashboardOrReportTemplateDialogAction';
import store from '../../../../../../store/store';

class ActionIconsController extends Controller {
  actionDispatchers = {
    openSaveAsDashboardOrReportTemplateDialog: () =>
      this.dispatch(new OpenSaveAsDashboardOrReportTemplateDialogAction())
  };
}

export const controller = new ActionIconsController(store.dispatch);
export type ActionDispatchers = typeof controller.actionDispatchers;
