import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from './MapView.module.scss';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import LeafletMapView from './leaflet/LeafletMapView';
import type { Chart } from '../../model/state/Chart';
import MapGeometryOptionsFactory from './factories/MapGeometryOptionsFactory';

type Props = {
  chart: Chart;
  stateNamespace: ChartAreaStateNamespace;
};

const MapView = ({ chart, stateNamespace }: Props): JSX.Element => {
  const geometryOptions = MapGeometryOptionsFactory.createMapGeometryOptions();

  return (
    <>
      <header className={styles.mapHeader}>
        <div className={styles.titles}>
          <span className={styles.title}>{chart.getTitleText()}</span>
          <span className={styles.subtitle}>{chart.getSubtitleText()}</span>
        </div>
        <div className={styles.emptyArea} />
        <div className={styles.geometrySelector}>
          <Dropdown selection placeholder="Select geometry" options={geometryOptions} />
        </div>
        <div className={styles.actionButtons}>
          <Icon className={styles.icon} inverted name="home" size="large" />
          <Icon className={styles.icon} inverted name="plus" size="large" />
          <Icon className={styles.icon} inverted name="minus" size="large" />
        </div>
      </header>
      <LeafletMapView chart={chart} stateNamespace={stateNamespace} />
    </>
  );
};

export default MapView;
