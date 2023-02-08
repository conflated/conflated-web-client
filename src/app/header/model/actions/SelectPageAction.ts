import AbstractHeaderAction from './AbstractHeaderAction';
import type { HeaderState } from '../state/HeaderState';
import type { PageStateNamespace } from '../../../common/components/page/model/state/types/PageStateNamespace';

export default class SelectPageAction extends AbstractHeaderAction {
  page: PageStateNamespace;

  constructor(page: PageStateNamespace) {
    super();
    this.page = page;
  }

  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      currentPage: this.page
    };

    return newState;
  }
}
