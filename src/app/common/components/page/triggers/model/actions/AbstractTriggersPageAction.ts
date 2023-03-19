import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import { TriggersPageState } from '../state/TriggersPageState';
import { TriggersPageStateNamespace } from '../state/TriggersPageStateNamespace';
import store from '../../../../../../../store/store';

export default abstract class AbstractTriggersPageAction extends AbstractCompositeAction<
  TriggersPageState,
  TriggersPageStateNamespace
> {
  constructor(triggersStateNamespace: TriggersPageStateNamespace) {
    super(triggersStateNamespace, createActionDispatcher(store.dispatch));
  }
}
