import type { NumberRange } from './NumberRange';

export default class NumberRangesParser {
  static parseNumberRange(numberRangeStr: string): NumberRange {
    if (numberRangeStr.startsWith('<')) {
      const number = parseInt(numberRangeStr.slice(1), 10);

      return {
        startValue: Number.MIN_SAFE_INTEGER,
        endValue: number,
        isEndValueExclusive: true
      };
    }

    if (numberRangeStr.startsWith('<=')) {
      const number = parseInt(numberRangeStr.slice(2), 10);

      return {
        startValue: Number.MIN_SAFE_INTEGER,
        endValue: number
      };
    }

    if (numberRangeStr.startsWith('>')) {
      const number = parseInt(numberRangeStr.slice(1), 10);

      return {
        startValue: number,
        endValue: Number.MAX_SAFE_INTEGER,
        isStartValueExclusive: true
      };
    }

    if (numberRangeStr.startsWith('>=')) {
      const number = parseInt(numberRangeStr.slice(2), 10);

      return {
        startValue: number,
        endValue: Number.MAX_SAFE_INTEGER
      };
    }

    if (/^-?\d+$/.test(numberRangeStr)) {
      const number = parseInt(numberRangeStr, 10);

      return {
        startValue: number,
        endValue: number
      };
    }

    const numberRangeParts = numberRangeStr.match(/^(-?\d+)(\s*-\s*)(-?\d+)$/);

    if (numberRangeParts) {
      const [, startValueStr, , endValueStr] = numberRangeParts;

      if (startValueStr && endValueStr) {
        const startValue = parseInt(startValueStr, 10);
        const endValue = parseInt(endValueStr, 10);

        return {
          startValue,
          endValue
        };
      }
    }

    return {
      startValue: NaN,
      endValue: NaN
    };
  }

  static parseNumberRanges(numberRangesStr: string): NumberRange[] {
    const numberRanges = numberRangesStr.split(',');
    const trimmedNumberRanges = numberRanges.map((numberRange: string) => numberRange.trim());
    return trimmedNumberRanges.map((numberRange: string) => this.parseNumberRange(numberRange));
  }
}
