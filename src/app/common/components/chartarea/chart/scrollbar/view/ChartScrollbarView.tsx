import _ from 'lodash';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Scrollbar from 'semantic-ui-react-scrollbar';
import { connect } from 'react-redux';
import styles from '../../view/ChartView.module.scss';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import { ActionDispatchers, controller } from '../controller/chartScrollbarController';

type OwnProps = {
  allowKeyControls: boolean;
  chart: Chart;
  className: string;
  orientation?: 'vertical' | 'horizontal';
  // eslint-disable-next-line react/no-unused-prop-types
  stateNamespace: ChartAreaStateNamespace;
};

type Props = OwnProps & ActionDispatchers;

const ChartScrollbarView: React.FC<Props> = ({
  allowKeyControls,
  changeXAxisScrollPosition,
  chart,
  className,
  orientation
}: Props) => {
  const maxScrollPosition = chart.getMaxScrollPosition();

  return maxScrollPosition > 0 ? (
    <Scrollbar
      allowArrowKeys={allowKeyControls}
      allowCtrlOrMetaArrowKeys={allowKeyControls}
      allowHomeAndEndKeys={allowKeyControls}
      changeScrollPosition={(scrollPosition: number) => changeXAxisScrollPosition(chart, scrollPosition)}
      className={`${className} ${orientation === 'vertical' ? styles.vertical : ''}`}
      maxScrollPosition={maxScrollPosition}
      orientation="vertical"
      pageSize={chart.xAxisCategoriesShownCount}
    />
  ) : null;
};

ChartScrollbarView.defaultProps = {
  orientation: 'horizontal'
};

export default connect(
  null,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(ChartScrollbarView);
