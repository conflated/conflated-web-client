import React from 'react';
import { Checkbox, Icon, Popup } from 'semantic-ui-react';
import L, { LatLngBounds } from 'leaflet';
import _ from 'lodash';
import styles from './MapView.module.scss';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import LeafletMapView from './leaflet/LeafletMapView';
import type { Chart } from '../../model/state/Chart';

type Props = {
  chart: Chart;
  stateNamespace: ChartAreaStateNamespace;
};

const MapView = ({ chart, stateNamespace }: Props) => {
  const resetMapBounds = () => {
    const [latitudeValues, longitudeValues] = chart.data.getMapLocationData(chart.selectedDimensions);

    if (latitudeValues.length > 0 && longitudeValues.length > 0) {
      const maxLatitude = _.max(latitudeValues);
      const minLongitude = _.min(longitudeValues);
      const minLatitude = _.min(latitudeValues);
      const maxLongitude = _.max(longitudeValues);
      const mapBoundsUpperLeftCorner = L.latLng(maxLatitude, minLongitude);
      const mapBoundsBottomRightCorner = L.latLng(minLatitude, maxLongitude);
      const mapBounds = new LatLngBounds(mapBoundsBottomRightCorner, mapBoundsUpperLeftCorner);
      chart.map?.fitBounds(mapBounds);
    }
  };

  const zoomInMap = () => {
    chart.map?.zoomIn();
  };

  const zoomOutMap = () => {
    chart.map?.zoomOut();
  };

  return chart.hasData() ? (
    <>
      <header className={styles.mapHeader}>
        <div className={styles.mapLayer}>
          <Popup
            content="Show/hide map layer 1"
            inverted
            mouseEnterDelay={1250}
            trigger={<Checkbox className={styles.checkbox} defaultChecked />}
          />
          <div className={styles.titles}>
            <span className={styles.title}>{chart.getTitleText(stateNamespace)}</span>
            <span className={styles.subtitle}>Cell</span>
          </div>
        </div>
        <Popup
          content="Add new map layer"
          inverted
          mouseEnterDelay={1250}
          trigger={<Icon className={styles.addIcon} name="plus" size="large" />}
        />
        <div className={styles.actionButtons}>
          <Popup
            content="Reset map bounds"
            inverted
            mouseEnterDelay={1250}
            trigger={<Icon className={styles.icon} inverted name="home" size="large" onClick={resetMapBounds} />}
          />
          <Popup
            content="Zoom in"
            inverted
            mouseEnterDelay={1250}
            trigger={<Icon className={styles.icon} inverted name="zoom-in" size="large" onClick={zoomInMap} />}
          />
          <Popup
            content="Zoom out"
            inverted
            mouseEnterDelay={1250}
            trigger={<Icon className={styles.icon} inverted name="zoom-out" size="large" onClick={zoomOutMap} />}
          />
          <Popup
            content="Show quick filter"
            inverted
            mouseEnterDelay={1250}
            trigger={<Icon className={styles.icon} inverted name="filter" size="large" />}
          />
          <Popup
            content="Search place"
            inverted
            mouseEnterDelay={1250}
            trigger={<Icon className={styles.icon} inverted name="search" size="large" />}
          />
        </div>
      </header>
      <LeafletMapView chart={chart} stateNamespace={stateNamespace} />
    </>
  ) : null;
};

export default MapView;
