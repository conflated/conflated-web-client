import _ from 'lodash';
import React from 'react';
import L, { LatLngBounds } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Chart } from '../../../model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import LeafletMapCircleGeometriesFactory from './LeafletCircleGeometriesFactory';

// eslint-disable-next-line react/no-unused-prop-types
type Props = { chart: Chart; stateNamespace: ChartAreaStateNamespace };

const LeafletMapView = ({ chart }: Props) => {
  let mapBounds: LatLngBounds | undefined;
  const [latitudeValues, longitudeValues] = chart.chartData.getMapLocationData(chart.selectedDimensions);

  if (latitudeValues.length > 0 && longitudeValues.length > 0) {
    const maxLatitude = _.max(latitudeValues);
    const minLongitude = _.min(longitudeValues);
    const minLatitude = _.min(latitudeValues);
    const maxLongitude = _.max(longitudeValues);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mapBoundsUpperLeftCorner = L.latLng(maxLatitude, minLongitude);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mapBoundsBottomRightCorner = L.latLng(minLatitude, maxLongitude);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // mapBounds = L.latLngBounds(mapBoundsUpperLeftCorner, mapBoundsBottomRightCorner);
    mapBounds = [
      [minLatitude, minLongitude],
      [maxLatitude, maxLongitude]
    ] as any;
  }

  return (
    <div style={{ height: '100%' }}>
      <MapContainer
        bounds={mapBounds ?? undefined}
        center={!mapBounds ? [51, 0] : undefined}
        zoom={!mapBounds ? 13 : undefined}
        style={{ height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {LeafletMapCircleGeometriesFactory.createCircleGeometries(chart)}
      </MapContainer>
    </div>
  );
};

export default LeafletMapView;
