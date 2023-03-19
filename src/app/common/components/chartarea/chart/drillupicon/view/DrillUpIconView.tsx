import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styles from './DrillUpIconView.module.scss';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import { ActionDispatchers, controller } from '../controller/drillUpIconController';
import type { Chart } from '../../model/state/Chart';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; stateNamespace: ChartAreaStateNamespace };
type Props = OwnProps & ActionDispatchers;

const DrillUpIconView = ({ chart, drillUpChart }: Props) =>
  chart.drillDowns && chart.drillDowns.length > 0 ? (
    <div className={styles.drillUpIcon}>
      <Icon name="arrow alternate circle left outline" size="large" onClick={() => drillUpChart(chart)} />
    </div>
  ) : null;

export default connect(
  null,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(DrillUpIconView);
