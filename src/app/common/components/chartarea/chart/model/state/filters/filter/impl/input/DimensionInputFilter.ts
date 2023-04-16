/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnNameToValuesMap } from '../../../../data/ColumnNameToValuesMap';
import AbstractInputFilter from './AbstractInputFilter';
import NumberRangesParser from '../../../../../../../../../utils/numberrange/NumberRangesParser';

export default class DimensionInputFilter extends AbstractInputFilter {
  getPlaceholder(): string {
    return 'Enter dimension values/names, e.g. 1, 50, 1000-1200';
  }

  applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap {
    if (!this.filterExpression) {
      return chartData;
    }

    const newChartData = chartData;
    const filteredInIndexes: number[] = [];
    const filterTerms = this.filterExpression.split(',');
    const trimmedFilterTerms = filterTerms.map((filterTerm: string) => filterTerm.trim());

    if (chartData[this.sqlColumn.name]) {
      newChartData[this.sqlColumn.name] = (chartData as any)[this.sqlColumn.name].filter(
        (chartDataValue: string, index: number): boolean => {
          const matchedFilterTermForChartDataValue = trimmedFilterTerms.find((term: string): boolean => {
            let chartDataValueMatchesTerm = false;

            if (term.includes('-')) {
              const numberRange = NumberRangesParser.parseNumberRange(term, true);
              const chartDataValueAsNumber = parseInt(chartDataValue, 10);
              if (
                Number.isFinite(numberRange.startValue) &&
                Number.isFinite(numberRange.endValue) &&
                Number.isFinite(chartDataValueAsNumber)
              ) {
                chartDataValueMatchesTerm =
                  chartDataValueAsNumber >= numberRange.startValue && chartDataValueAsNumber <= numberRange.endValue;
              }
            } else {
              chartDataValueMatchesTerm = this.doesChartDataValueMatchTerm(chartDataValue, term);
            }

            if (chartDataValueMatchesTerm) {
              filteredInIndexes.push(index);
            }

            return chartDataValueMatchesTerm;
          });

          return !!matchedFilterTermForChartDataValue;
        }
      );
    }

    return this.filterChartDataOtherColumns(newChartData, filteredInIndexes);
  }

  // noinspection JSMethodCanBeStatic
  doesChartDataValueMatchTerm(chartDataValue: string, term: string): boolean {
    if (
      term.length >= 3 &&
      (term.startsWith('%') || term.startsWith('*')) &&
      (term.endsWith('%') || term.endsWith('*'))
    ) {
      return chartDataValue.includes(term.slice(1, -1));
    } else if (term.length > 1 && (term.endsWith('%') || term.endsWith('*'))) {
      return chartDataValue.startsWith(term.slice(0, -1));
    } else if (term.length > 1 && (term.startsWith('%') || term.startsWith('*'))) {
      return chartDataValue.endsWith(term.slice(1));
    }

    return chartDataValue === term;
  }
}
