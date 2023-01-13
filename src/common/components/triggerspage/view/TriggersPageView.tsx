import React from 'react';
import PageView from '../../page/view/PageView';
import type { TriggersPageStateNamespace } from '../model/state/namespace/TriggersPageStateNamespace';
import TriggersPageLeftPaneView from '../leftpane/view/TriggersPageLeftPaneView';
import TriggersPageChartAreaView from '../chartarea/view/TriggersPageChartAreaView';

type Props = {
  pageStateNamespace: TriggersPageStateNamespace;
};

const TriggersPageView = ({ pageStateNamespace }: Props) => (
  <PageView
    leftPane={<TriggersPageLeftPaneView pageStateNamespace={pageStateNamespace} />}
    middlePane={<TriggersPageChartAreaView pageStateNamespace={pageStateNamespace} />}
    pageStateNamespace={pageStateNamespace}
    showPaneActivatorHintsOnComponentMount
  />
);

export default TriggersPageView;
