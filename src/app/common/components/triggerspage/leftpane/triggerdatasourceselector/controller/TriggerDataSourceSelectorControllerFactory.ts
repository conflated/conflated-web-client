import { NamespacedControllerFactory } from 'oo-redux-utils';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import SelectTriggerDataSourceAction from '../model/actions/SelectTriggerDataSourceAction';
import StartFetchTriggerDataSourcesAction from '../model/actions/StartFetchTriggerDataSourcesAction';
import diContainer from '../../../../../../../di/diContainer';
import type { TriggersPageStateNamespace } from '../../../model/state/namespace/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../model/state/datasource/DataSource';

export default class TriggerDataSourceSelectorControllerFactory extends NamespacedControllerFactory<TriggersPageStateNamespace> {
  createController = () => ({
    selectTriggerDataSource: (dataSource: DataSource) =>
      this.dispatchAction(new SelectTriggerDataSourceAction(this.stateNamespace, dataSource)),

    startFetchTriggerDataSources: async (): Promise<void> =>
      this.dispatchActionWithDi(diContainer, StartFetchTriggerDataSourcesAction, {}),

    toggleShouldShowTriggersPageLeftPanePermanently: () =>
      this.dispatchAction(new ToggleShouldShowPagePanePermanentlyAction(this.stateNamespace, 'leftPane'))
  });
}
