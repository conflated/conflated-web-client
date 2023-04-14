import { useMap } from 'react-leaflet';
import _ from 'lodash';
import L, { LatLngBounds } from 'leaflet';
import { Chart } from '../../../model/state/Chart';

type Props = { chart: Chart };
const MapBoundsSetter = ({ chart }: Props) => {
  const map = useMap();
  const [latitudeValues, longitudeValues] = chart.chartData.getMapLocationData(chart.selectedDimensions);

  if (latitudeValues.length > 0 && longitudeValues.length > 0) {
    const maxLatitude = _.max(latitudeValues);
    const minLongitude = _.min(longitudeValues);
    const minLatitude = _.min(latitudeValues);
    const maxLongitude = _.max(longitudeValues);
    const mapBoundsUpperLeftCorner = L.latLng(maxLatitude, minLongitude);
    const mapBoundsBottomRightCorner = L.latLng(minLatitude, maxLongitude);
    const mapBounds = new LatLngBounds(mapBoundsBottomRightCorner, mapBoundsUpperLeftCorner);
    map.fitBounds(mapBounds);
  }

  return null;
};

export default MapBoundsSetter;
