/* eslint-disable no-bitwise */
// @flow

export default class HashValueCalculator {
  static hashValue(value: any): number {
    let hash = 0;

    if (value) {
      const string = value.toString();

      for (let i = 0; i < string.length; i++) {
        // noinspection NonShortCircuitBooleanExpressionJS
        hash = ((hash << 5) - hash + string.charCodeAt(i)) & 0xffffffff;
      }
    }

    return hash;
  }

  static hashObject(object: Object): number {
    return Object.keys(object).reduce(
      (result: number, key: string) =>
        result + HashValueCalculator.hashValue(key + HashValueCalculator.calculateHash(object[key])),
      0
    );
  }

  static hashValues(...args: Array<any>): number {
    return args.reduce(
      (result: number, arg: any, index: number) =>
        result + HashValueCalculator.hashValue(index.toString() + HashValueCalculator.calculateHash(arg)),
      0
    );
  }

  static calculateHash(value: any): number {
    const typeNameToHashFunctionMap = {
      string: this.hashValue,
      number: this.hashValue,
      boolean: this.hashValue,
      object: this.hashObject
    };

    const typeName = typeof value;

    return value != null && typeof value !== 'undefined' && typeNameToHashFunctionMap[typeName]
      ? typeNameToHashFunctionMap[typeName](value) + this.hashValue(typeName)
      : 0;
  }
}
