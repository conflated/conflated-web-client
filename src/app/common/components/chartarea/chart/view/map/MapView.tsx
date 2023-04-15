import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import L, { LatLngBounds } from 'leaflet';
import _ from 'lodash';
import styles from './MapView.module.scss';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import LeafletMapView from './leaflet/LeafletMapView';
import type { Chart } from '../../model/state/Chart';
import MapGeometryOptionsFactory from './factories/MapGeometryOptionsFactory';

type Props = {
  chart: Chart;
  stateNamespace: ChartAreaStateNamespace;
};

const MapView = ({ chart, stateNamespace }: Props) => {
  const resetMapBounds = () => {
    const [latitudeValues, longitudeValues] = chart.chartData.getMapLocationData(chart.selectedDimensions);

    if (latitudeValues.length > 0 && longitudeValues.length > 0) {
      const maxLatitude = _.max(latitudeValues);
      const minLongitude = _.min(longitudeValues);
      const minLatitude = _.min(latitudeValues);
      const maxLongitude = _.max(longitudeValues);
      const mapBoundsUpperLeftCorner = L.latLng(maxLatitude, minLongitude);
      const mapBoundsBottomRightCorner = L.latLng(minLatitude, maxLongitude);
      const mapBounds = new LatLngBounds(mapBoundsBottomRightCorner, mapBoundsUpperLeftCorner);
      chart.map.fitBounds(mapBounds);
    }
  };

  const geometryOptions = MapGeometryOptionsFactory.createMapGeometryOptions();

  return chart.hasData() ? (
    <>
      <header className={styles.mapHeader}>
        <div className={styles.titles}>
          <span className={styles.title}>{chart.getTitleText(stateNamespace)}</span>
          <span className={styles.subtitle}>Cell</span>
        </div>
        <div className={styles.emptyArea} />
        <div className={styles.geometrySelector}>
          <Dropdown selection placeholder="Select geometry" options={geometryOptions} />
        </div>
        <div className={styles.actionButtons}>
          <Icon className={styles.icon} inverted name="tint" size="large" />
          <Icon className={styles.icon} inverted name="home" size="large" onClick={resetMapBounds} />
          <Icon className={styles.icon} inverted name="plus" size="large" />
          <Icon className={styles.icon} inverted name="minus" size="large" />
          <Icon className={styles.icon} inverted name="search" size="large" />
        </div>
      </header>
      <LeafletMapView chart={chart} stateNamespace={stateNamespace} />
    </>
  ) : null;
};

export default MapView;
