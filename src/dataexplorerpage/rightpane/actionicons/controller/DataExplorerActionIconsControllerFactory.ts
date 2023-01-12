import { ControllerFactory } from 'oo-redux-utils';
import OpenSaveAsDashboardOrReportTemplateDialogAction from '../../../saveasdashboardorreporttemplatedialog/model/actions/OpenSaveAsDashboardOrReportTemplateDialogAction';

export default class DataExplorerActionIconsControllerFactory extends ControllerFactory {
  createController = () => ({
    openSaveAsDashboardOrReportTemplateDialog: () =>
      this.dispatchAction(new OpenSaveAsDashboardOrReportTemplateDialogAction())
  });
}
