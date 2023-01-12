export default class FilterUtils {
  static filterNamedObjectsByName = <T extends { readonly name: string }>(namedObjects: T[], name: string): T[] =>
    namedObjects.filter((namedObject: T) => name.length === 0 || (name.length > 0 && namedObject.name.includes(name)));
}
