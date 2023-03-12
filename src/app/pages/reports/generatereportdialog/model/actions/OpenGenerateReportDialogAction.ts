import AbstractGenerateReportDialogAction from './AbstractGenerateReportDialogAction';
import { GenerateReportDialogState } from '../state/GenerateReportDialogState';

export default class OpenGenerateReportDialogAction extends AbstractGenerateReportDialogAction {
  perform(currentState: GenerateReportDialogState): GenerateReportDialogState {
    return {
      ...currentState,
      isOpen: true
    };
  }
}
