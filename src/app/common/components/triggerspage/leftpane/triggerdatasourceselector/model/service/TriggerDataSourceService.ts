import type { DataSource } from '../../../../../chartarea/chart/model/state/datasource/DataSource';
import { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

export default class TriggerDataSourceService {
  // noinspection JSMethodCanBeStatic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchTriggerDataSources(stateNamespace: TriggersPageStateNamespace): Promise<DataSource[]> {
    throw new TypeError('Abstract method error');
  }
}
