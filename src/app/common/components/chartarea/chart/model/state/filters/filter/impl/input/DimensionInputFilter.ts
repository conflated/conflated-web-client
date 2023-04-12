/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnNameToValuesMap } from '../../../../chartdata/ColumnNameToValuesMap';
import InputFilter from './InputFilter';

export default class DimensionInputFilter extends InputFilter {
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
            const chartDataValueMatchesTerm = this.doesChartDataValueMatchTerm(chartDataValue, term);
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
    if (term.length > 1 && (term.endsWith('%') || term.endsWith('*'))) {
      return chartDataValue.startsWith(term.substring(1, term.length - 2));
    } else if (term.length > 1 && (term.startsWith('%') || term.startsWith('*'))) {
      return chartDataValue.endsWith(term.substring(1));
    } else if (
      term.length >= 3 &&
      (term.startsWith('%') || term.startsWith('*')) &&
      (term.endsWith('%') || term.endsWith('*'))
    ) {
      return chartDataValue.includes(term.substring(1, term.length - 2));
    }

    return chartDataValue === term;
  }
}
