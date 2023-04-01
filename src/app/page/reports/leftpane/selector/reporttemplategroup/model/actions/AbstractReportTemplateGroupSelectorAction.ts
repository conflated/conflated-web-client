import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import { ReportTemplateGroupSelectorState } from '../state/ReportTemplateGroupSelectorState';
import store from '../../../../../../../../store/store';

export default abstract class AbstractReportTemplateGroupSelectorAction extends AbstractCompositeAction<ReportTemplateGroupSelectorState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
