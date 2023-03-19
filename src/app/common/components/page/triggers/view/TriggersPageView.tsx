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
  pageStateNamespace: TriggersPageStateNamespace;
};

type Props = OwnProps & State & ActionDispatchers;

const TriggersPageView = ({ closeTriggerDetailsDialog, pageStateNamespace, shouldShowTriggerDetailsDialog }: Props) => (
  <>
    <PageView
      leftPane={<TriggersPageLeftPaneView pageStateNamespace={pageStateNamespace} />}
      middlePane={<TriggersPageChartAreaView pageStateNamespace={pageStateNamespace} />}
      pageStateNamespace={pageStateNamespace}
      showPaneActivatorHintsOnComponentMount
    />
    {shouldShowTriggerDetailsDialog && <TriggerDetailsDialogView closeDialog={closeTriggerDetailsDialog} />}
  </>
);

export default connect(
  controller.getState,
  _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
)(TriggersPageView);
