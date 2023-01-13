export default class MapGeometryOptionsFactory {
  static createMapGeometryOptions(): Array<{ key: string; text: string; value: string }> {
    return [
      {
        key: 'Marker',
        text: 'Marker',
        value: 'Marker'
      },
      {
        key: 'Circle',
        text: 'Circle',
        value: 'Circle'
      },
      {
        key: 'Line',
        text: 'Line',
        value: 'Line'
      },
      {
        key: 'Rectangle',
        text: 'Rectangle',
        value: 'Rectangle'
      },
      {
        key: 'Polygon',
        text: 'Polygon',
        value: 'Polygon'
      },
      {
        key: 'Sector',
        text: 'Sector',
        value: 'Sector'
      }
    ];
  }
}
