import AbstractGenerateReportDialogAction from './AbstractGenerateReportDialogAction';
import { GenerateReportDialogState } from '../state/GenerateReportDialogState';

export default class OpenAction extends AbstractGenerateReportDialogAction {
  perform(currentState: GenerateReportDialogState): GenerateReportDialogState {
    return {
      ...currentState,
      isOpen: true
    };
  }
}
