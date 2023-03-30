import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
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
  const zoomIn = () => {
    // TODO: Not implemented?
  };

  const zoomOut = () => {
    // TODO: Not implemented?
  };

  const geometryOptions = MapGeometryOptionsFactory.createMapGeometryOptions();

  return (
    <>
      <header className={styles.mapHeader}>
        <div className={styles.titles}>
          <span className={styles.title}>Title</span>
          <span className={styles.subtitle}>Subtitle</span>
        </div>
        <div className={styles.emptyArea} />
        <div className={styles.geometrySelector}>
          <Dropdown selection placeholder="Select geometry" options={geometryOptions} />
        </div>
        <div className={styles.actionButtons}>
          <Button icon>
            <Icon name="home" />
          </Button>
          <Button icon onClick={zoomIn}>
            <Icon name="plus" />
          </Button>
          <Button icon onClick={zoomOut}>
            <Icon name="minus" />
          </Button>
        </div>
      </header>
      <LeafletMapView chart={chart} stateNamespace={stateNamespace} />
    </>
  );
};

export default MapView;
