import OpenSaveAsDashboardOrReportTemplateDialogAction from '../../saveasdashboardorreporttemplatedialog/model/actions/OpenSaveAsDashboardOrReportTemplateDialogAction';
import Controller from '../../../../../Controller';
import store from '../../../../../store/store';

class DataExplorerActionIconsController extends Controller {
  getActionDispatchers() {
    return {
      openSaveAsDashboardOrReportTemplateDialog: () =>
        this.dispatch(new OpenSaveAsDashboardOrReportTemplateDialogAction())
    };
  }
}

export const controller = new DataExplorerActionIconsController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
