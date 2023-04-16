import type { NumberRange } from './NumberRange';

export default class NumberRangesParser {
  static parseNumberRange(numberRangeStr: string, allowPlainRanges = true): NumberRange {
    if (numberRangeStr.startsWith('<=')) {
      const number = parseInt(numberRangeStr.slice(2), 10);

      return {
        startValue: Number.MIN_SAFE_INTEGER,
        endValue: number
      };
    }

    if (numberRangeStr[0] === '<') {
      const number = parseInt(numberRangeStr.slice(1), 10);

      return {
        startValue: Number.MIN_SAFE_INTEGER,
        endValue: number,
        isEndValueExclusive: true
      };
    }

    if (numberRangeStr.startsWith('>=')) {
      const number = parseInt(numberRangeStr.slice(2), 10);

      return {
        startValue: number,
        endValue: Number.MAX_SAFE_INTEGER
      };
    }

    if (numberRangeStr[0] === '>') {
      const number = parseInt(numberRangeStr.slice(1), 10);

      return {
        startValue: number,
        endValue: Number.MAX_SAFE_INTEGER,
        isStartValueExclusive: true
      };
    }

    if (allowPlainRanges || (!allowPlainRanges && numberRangeStr[0] === '=')) {
      const finalNumberRangeStr = allowPlainRanges ? numberRangeStr : numberRangeStr.slice(1);

      if (/^-?\d+$/.test(finalNumberRangeStr)) {
        const number = parseInt(finalNumberRangeStr, 10);

        return {
          startValue: number,
          endValue: number
        };
      }

      const numberRangeParts = finalNumberRangeStr.match(/^(-?\d+)(\s*-\s*)(-?\d+)$/);

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
    }

    return {
      startValue: NaN,
      endValue: NaN
    };
  }

  static parseNumberRanges(numberRangesStr: string, allowPlainRanges = true): NumberRange[] {
    const numberRanges = numberRangesStr.split(',');
    const trimmedNumberRanges = numberRanges.map((numberRange: string) => numberRange.trim());
    return trimmedNumberRanges.map((numberRange: string) => this.parseNumberRange(numberRange, allowPlainRanges));
  }
}
