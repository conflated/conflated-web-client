import _ from 'lodash';
import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Chart } from '../../../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../../model/state/namespace/ChartAreaPageStateNamespace';
import LeafletMapCircleGeometriesFactory from './factories/LeafletCircleGeometriesFactory';

// eslint-disable-next-line react/no-unused-prop-types
type Props = { chart: Chart; stateNamespace: ChartAreaPageStateNamespace };

export default function LeafletMapView({ chart }: Props): JSX.Element {
  let mapBounds;
  const [latitudeValues, longitudeValues] = chart.chartData.getMapLocationData(chart.selectedDimensions);

  if (latitudeValues.length > 0 && longitudeValues.length > 0) {
    const maxLatitude = _.max(latitudeValues);
    const minLongitude = _.min(longitudeValues);
    const minLatitude = _.min(latitudeValues);
    const maxLongitude = _.max(longitudeValues);

    const mapBoundsUpperLeftCorner = L.latLng(maxLatitude, minLongitude);
    const mapBoundsBottomRightCorner = L.latLng(minLatitude, maxLongitude);

    mapBounds = L.latLngBounds(mapBoundsUpperLeftCorner, mapBoundsBottomRightCorner);
  }

  return (
    <div key={chart.id} style={{ height: '100%' }}>
      <MapContainer bounds={mapBounds} style={{ height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {LeafletMapCircleGeometriesFactory.createCircleGeometries(chart)}
      </MapContainer>
    </div>
  );
}
