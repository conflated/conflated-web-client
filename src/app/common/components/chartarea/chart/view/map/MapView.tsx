import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import { actionButtons, emptyArea, geometrySelector, mapHeader, subtitle, title, titles } from './MapView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
import LeafletMapView from './leaflet/LeafletMapView';
import type { Chart } from '../../model/state/Chart';
import MapGeometryOptionsFactory from './factories/MapGeometryOptionsFactory';

type Props = {
  chart: Chart;
  stateNamespace: ChartAreaPageStateNamespace;
};

export default function MapView({ chart, stateNamespace }: Props): JSX.Element {
  const zoomIn = () => {
    // TODO: Not implemented?
  };

  const zoomOut = () => {
    // TODO: Not implemented?
  };

  const geometryOptions = MapGeometryOptionsFactory.createMapGeometryOptions();

  return (
    <>
      <header className={mapHeader}>
        <div className={titles}>
          <span className={title}>Title</span>
          <span className={subtitle}>Subtitle</span>
        </div>
        <div className={emptyArea} />
        <div className={geometrySelector}>
          <Dropdown selection placeholder="Select geometry" options={geometryOptions} />
        </div>
        <div className={actionButtons}>
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
}
