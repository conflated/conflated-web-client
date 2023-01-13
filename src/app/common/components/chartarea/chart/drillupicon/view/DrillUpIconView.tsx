import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import { Icon } from 'semantic-ui-react';
import styles from './DrillUpIconView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
import DrillUpIconControllerFactory from '../controller/DrillUpIconControllerFactory';
import type { Chart } from '../../model/state/Chart';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; pageStateNamespace: ChartAreaPageStateNamespace };
const mapAppStateToComponentProps = () => ({});

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new DrillUpIconControllerFactory(dispatch, pageStateNamespace).createController();

type Props = OwnProps & ReturnType<typeof createController>;

function DrillUpIconView({ chart, drillUpChart }: Props) {
  return chart.drillDowns.length > 0 ? (
    <div className={styles.drillUpIcon}>
      <Icon name="arrow alternate circle left outline" size="large" onClick={() => drillUpChart(chart)} />
    </div>
  ) : null;
}

export default connect(mapAppStateToComponentProps, createController)(DrillUpIconView);
