// @flow

export default class TriggerListItemBadgeColorFactory {
  static createBadgeColor(severity: string): string {
    let color = 'green';

    switch (severity) {
      case 'Major':
        color = 'orange';
        break;
      case 'Minor':
      case 'Below target':
        color = 'yellow';
        break;
      case 'Critical':
      case 'Far below target':
        color = 'red';
        break;
      default:
    }

    return color;
  }
}
