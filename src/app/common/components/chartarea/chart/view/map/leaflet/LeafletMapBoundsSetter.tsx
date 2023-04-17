import { useState } from 'react';
import { useMap } from 'react-leaflet';
import _ from 'lodash';
import L, { LatLngBounds } from 'leaflet';
import { Chart } from '../../../model/state/Chart';

type State = {
  maxLatitude?: number;
  minLongitude?: number;
  minLatitude?: number;
  maxLongitude?: number;
};
type Props = { chart: Chart };
const LeafletMapBoundsSetter = ({ chart }: Props) => {
  const [previousMapBounds, setPreviousMapBounds] = useState({} as State);
  const map = useMap();
  chart.setMap(map);
  const [latitudeValues, longitudeValues] = chart.data.getMapLocationData(chart.selectedDimensions);

  if (latitudeValues.length > 0 && longitudeValues.length > 0) {
    const maxLatitude = _.max(latitudeValues);
    const minLongitude = _.min(longitudeValues);
    const minLatitude = _.min(latitudeValues);
    const maxLongitude = _.max(longitudeValues);

    if (
      previousMapBounds.maxLatitude !== maxLatitude ||
      previousMapBounds.minLongitude !== minLongitude ||
      previousMapBounds.minLatitude !== minLatitude ||
      previousMapBounds.maxLongitude !== maxLongitude
    ) {
      const mapBoundsUpperLeftCorner = L.latLng(maxLatitude, minLongitude);
      const mapBoundsBottomRightCorner = L.latLng(minLatitude, maxLongitude);
      const mapBounds = new LatLngBounds(mapBoundsBottomRightCorner, mapBoundsUpperLeftCorner);
      map.fitBounds(mapBounds);

      setPreviousMapBounds({
        maxLatitude,
        minLongitude,
        minLatitude,
        maxLongitude
      });
    }
  }

  return null;
};

export default LeafletMapBoundsSetter;
