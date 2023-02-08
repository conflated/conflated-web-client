import { AbstractAction } from 'oo-redux-utils2';
import type { PageState } from '../state/PageState';
import type { PageStateNamespace } from '../state/types/PageStateNamespace';

export default abstract class AbstractPageAction extends AbstractAction<PageState, PageStateNamespace> {}
