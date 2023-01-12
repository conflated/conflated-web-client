import { AbstractAction } from 'oo-redux-utils';
import type { PageState } from '../state/PageState';
import type { PageStateNamespace } from '../state/namespace/PageStateNamespace';

export default class AbstractPageAction extends AbstractAction<PageState, PageStateNamespace> {}
