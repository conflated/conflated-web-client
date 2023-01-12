import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Scrollbar from 'semantic-ui-react-scrollbar';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import ChartScrollbarControllerFactory from '../controller/ChartScrollbarControllerFactory';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; className: string; pageStateNamespace: ChartAreaPageStateNamespace };
const mapAppStateToComponentProps = () => ({});

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new ChartScrollbarControllerFactory(dispatch, pageStateNamespace).createController();

type Controller = ReturnType<typeof createController>;
type Props = OwnProps & Controller;

function ChartScrollbarView({ changeXAxisScrollPosition, chart, className }: Props): JSX.Element | null {
  const maxScrollPosition = chart.getMaxScrollPosition();

  return maxScrollPosition > 0 ? (
    <Scrollbar
      className={className}
      maxScrollPosition={maxScrollPosition}
      changeScrollPosition={(scrollPosition: number) => changeXAxisScrollPosition(scrollPosition)}
    />
  ) : null;
}

export default connect(mapAppStateToComponentProps, createController)(ChartScrollbarView);
