import { Controller } from 'oo-redux-utils2';
import OpenSaveAsDashboardOrReportTemplateDialogAction from '../../../../dialog/saveasdashboardorreporttemplate/model/actions/OpenSaveAsDashboardOrReportTemplateDialogAction';
import store from '../../../../../../../store/store';

class DataExplorerActionIconsController extends Controller {
  actionDispatchers = {
    openSaveAsDashboardOrReportTemplateDialog: () =>
      this.dispatch(new OpenSaveAsDashboardOrReportTemplateDialogAction())
  };
}

export const controller = new DataExplorerActionIconsController(store.dispatch);
export type ActionDispatchers = typeof controller.actionDispatchers;
