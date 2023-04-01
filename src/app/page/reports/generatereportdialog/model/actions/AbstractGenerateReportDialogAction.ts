import { AbstractAction } from 'oo-redux-utils2';
import { GenerateReportDialogState } from '../state/GenerateReportDialogState';

export default abstract class AbstractGenerateReportDialogAction extends AbstractAction<GenerateReportDialogState> {
  constructor() {
    super('');
  }
}
