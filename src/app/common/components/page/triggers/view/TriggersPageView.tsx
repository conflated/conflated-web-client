import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageView from '../../view/PageView';
import type { TriggersPageStateNamespace } from '../model/state/TriggersPageStateNamespace';
import TriggersPageLeftPaneView from '../leftpane/view/TriggersPageLeftPaneView';
import TriggersPageChartAreaView from '../chartarea/view/TriggersPageChartAreaView';
import { ActionDispatchers, controller, State } from '../controller/triggersPageController';
import TriggerDetailsDialogView from './detailsdialog/TriggerDetailsDialogView';

export type OwnProps = {
  stateNamespace: TriggersPageStateNamespace;
};

type Props = OwnProps & State & ActionDispatchers;

const TriggersPageView = ({ closeTriggerDetailsDialog, stateNamespace, shouldShowTriggerDetailsDialog }: Props) => (
  <>
    <PageView
      leftPane={<TriggersPageLeftPaneView stateNamespace={stateNamespace} />}
      middlePane={<TriggersPageChartAreaView stateNamespace={stateNamespace} />}
      stateNamespace={stateNamespace}
      showPaneActivatorHintsOnComponentMount
    />
    {shouldShowTriggerDetailsDialog && <TriggerDetailsDialogView closeDialog={closeTriggerDetailsDialog} />}
  </>
);

export default connect(
  controller.getState,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(TriggersPageView);
