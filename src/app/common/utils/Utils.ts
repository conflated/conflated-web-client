/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import Constants from '../Constants';

export function without<T>(item: T) {
  return function (otherItem: T) {
    return item !== otherItem;
  };
}

export default class Utils {
  static pick<T extends { [key: string]: any }>(items: T[], key: keyof T, wantedValue?: any): T[] {
    return items.filter(
      (item: T) => (wantedValue != null && item[key] === wantedValue) || (wantedValue == null && item[key])
    );
  }

  static without<T extends { [key: string]: any }>(items: T[], key: keyof T, unwantedValue: any): T[] {
    return items.filter((item: T) => item[key] !== unwantedValue);
  }

  static replace<T extends { [key: string]: any }>(items: T[], oldItem: T, newItem: T): T[] {
    return items.map((item: T) => (item === oldItem ? newItem : item));
  }

  static findElem<T extends { [key: string]: any }>(items: T[], key: keyof T, wantedValue: any): T | null | undefined {
    return items.find((item: T) => item[key] === wantedValue);
  }

  static findLastElem<T extends { [key: string]: any }>(
    items: T[],
    key: keyof T,
    wantedValue?: any
  ): T | null | undefined {
    return _.findLast<T>(
      items,
      (item: T) => (!wantedValue != null && item[key] === wantedValue) || (wantedValue == null && item[key])
    );
  }

  static has<T extends { [key: string]: any }>(items: T[], key: keyof T, wantedValue: any): boolean {
    return !_.isUndefined(items.find((item: T) => item[key] === wantedValue));
  }

  static merge<T extends { [key: string]: any }>(items: T[], wantedItem: T, objectToMerge: Partial<T>): T[] {
    return items.map((item: T) => (item === wantedItem ? { ...item, ...objectToMerge } : item));
  }

  static parseIntOrDefault(numberStr: string, defaultValue: number | string): number {
    const value = parseInt(numberStr, 10);
    const finalDefaultValue = typeof defaultValue === 'number' ? defaultValue : parseInt(defaultValue, 10);
    return _.isFinite(value) ? value : finalDefaultValue;
  }

  static secsToMillis(valueInSecs: number): number {
    return valueInSecs * Constants.NBR_OF_MILLISECS_IN_SEC;
  }
}
