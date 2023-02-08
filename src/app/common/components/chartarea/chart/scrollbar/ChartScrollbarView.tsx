import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Scrollbar from 'semantic-ui-react-scrollbar';
import { connect } from 'react-redux';
import type { Chart } from '../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../model/state/types/ChartAreaPageStateNamespace';
import { ActionDispatchers, controller } from './chartScrollbarController';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; className: string; pageStateNamespace: ChartAreaPageStateNamespace };
type Props = OwnProps & ActionDispatchers;

const ChartScrollbarView = ({ changeXAxisScrollPosition, chart, className }: Props) => {
  const maxScrollPosition = chart.getMaxScrollPosition();

  return maxScrollPosition > 0 ? (
    <Scrollbar
      className={className}
      maxScrollPosition={maxScrollPosition}
      changeScrollPosition={(scrollPosition: number) => changeXAxisScrollPosition(scrollPosition)}
    />
  ) : null;
};

export default connect(controller.getState, (_, { pageStateNamespace }: OwnProps) =>
  controller.getActionDispatchers(pageStateNamespace)
)(ChartScrollbarView);
