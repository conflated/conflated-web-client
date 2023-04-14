import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Chart } from '../../../model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import LeafletMapCircleGeometriesFactory from './LeafletCircleGeometriesFactory';
import MapBoundsSetter from './MapBoundsSetter';

// eslint-disable-next-line react/no-unused-prop-types
type Props = { chart: Chart; stateNamespace: ChartAreaStateNamespace };

const LeafletMapView = ({ chart }: Props) => (
  <div style={{ height: '100%' }}>
    <MapContainer center={[0, 0]} zoom={1} style={{ height: '100%' }}>
      <MapBoundsSetter chart={chart} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {LeafletMapCircleGeometriesFactory.createCircleGeometries(chart)}
    </MapContainer>
  </div>
);

export default LeafletMapView;
