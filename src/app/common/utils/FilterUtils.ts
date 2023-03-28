export default class FilterUtils {
  static filterNamedObjectsByName = <T extends { readonly name: string }>(namedObjects: T[], keywords: string): T[] =>
    namedObjects.filter(
      (namedObject: T) =>
        keywords.length === 0 ||
        (keywords.length > 0 &&
          keywords.split(' ').every((keyword) => namedObject.name.toLowerCase().includes(keyword.toLowerCase())))
    );
}
