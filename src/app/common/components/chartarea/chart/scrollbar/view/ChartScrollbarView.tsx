import _ from 'lodash';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Scrollbar from 'semantic-ui-react-scrollbar';
import { connect } from 'react-redux';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import { ActionDispatchers, controller } from '../controller/chartScrollbarController';

type OwnProps = {
  allowKeyControls: boolean;
  chart: Chart;
  className: string;
  // eslint-disable-next-line react/no-unused-prop-types
  pageStateNamespace: ChartAreaPageStateNamespace;
};

type Props = OwnProps & ActionDispatchers;

const ChartScrollbarView = ({ allowKeyControls, changeXAxisScrollPosition, chart, className }: Props) => {
  const maxScrollPosition = chart.getMaxScrollPosition();

  return maxScrollPosition > 0 ? (
    <Scrollbar
      className={className}
      allowArrowKeys={allowKeyControls}
      allowCtrlOrMetaArrowKeys={allowKeyControls}
      allowHomeAndEndKeys={allowKeyControls}
      pageSize={chart.xAxisCategoriesShownCount}
      maxScrollPosition={maxScrollPosition}
      changeScrollPosition={(scrollPosition: number) => changeXAxisScrollPosition(chart, scrollPosition)}
    />
  ) : null;
};

export default connect(
  null,
  _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
)(ChartScrollbarView);
