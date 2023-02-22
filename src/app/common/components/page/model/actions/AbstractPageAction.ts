import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { PageState } from '../state/PageState';
import type { PageStateNamespace } from '../state/types/PageStateNamespace';
import store from '../../../../../../store/store';

export default abstract class AbstractPageAction extends AbstractCompositeAction<PageState, PageStateNamespace> {
  constructor(stateNamespace: PageStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
