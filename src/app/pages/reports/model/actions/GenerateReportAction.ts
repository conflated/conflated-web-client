import AbstractReportsPageAction from './AbstractReportsPageAction';
import { ReportsPageState } from '../state/ReportsPageState';

export default class GenerateReportAction extends AbstractReportsPageAction {
  perform(currentState: ReportsPageState): ReportsPageState {
    return currentState;
  }
}
