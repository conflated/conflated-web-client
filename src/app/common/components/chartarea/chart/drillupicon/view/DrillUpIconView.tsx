import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styles from './DrillUpIconView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import { ActionDispatchers, controller } from '../controller/drillUpIconController';
import type { Chart } from '../../model/state/Chart';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; pageStateNamespace: ChartAreaPageStateNamespace };
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
    (__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace),
    (...args) => args[1].pageStateNamespace
  )
)(DrillUpIconView);
