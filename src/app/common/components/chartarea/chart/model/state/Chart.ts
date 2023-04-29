/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import type { DimensionVisualizationType } from './selecteddimension/DimensionVisualizationType';
import type { SelectedMeasure } from './selectedmeasure/SelectedMeasure';
import type { MeasureVisualizationType } from './selectedmeasure/types/MeasureVisualizationType';
import type { FillType } from './types/FillType';
import type { AggregationFunction } from './selectedmeasure/types/AggregationFunction';
import type { ChartType } from './types/ChartType';
import type { ChartConfiguration } from './ChartConfiguration';
import type { DataSource } from './datasource/DataSource';
import type { ChartFilters } from './filters/ChartFilters';
import type { ChartSorts } from './sorts/ChartSorts';
import type { DrillDown } from './types/DrillDown';
import type { DataPoint } from './types/DataPoint';
import type { ChartMenuConfirmationType } from './types/ChartMenuConfirmationType';
import type { ChartData } from './data/ChartData';
import type { Measure } from '../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Theme } from '../../../../../../page/dataexplorer/model/state/types/Theme';
import type { SelectedDimension } from './selecteddimension/SelectedDimension';
import type { DataSeries } from './types/DataSeries';
import DimensionDropZoneListItemViewFactory from '../../../../../../page/dataexplorer/pane/left/selector/dimension/view/DimensionDropZoneListItemViewFactory';
import type { LegendPosition } from './types/LegendPosition';
import type { Filter } from './filters/filter/Filter';
import type { ColumnNameToValuesMap } from './data/ColumnNameToValuesMap';
import type { Sort } from './sorts/sort/Sort';
import type { Column } from './types/Column';
import { GridItem } from '../../../model/state/types/GridItem';
import MeasureDropZoneListItemViewFactory from '../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export interface Chart {
  id: string;
  type: ChartType;
  dataSource: DataSource;
  selectedMeasures: SelectedMeasure[];
  selectedDimensions: SelectedDimension[];
  filters: ChartFilters;
  sorts: ChartSorts;
  data: ChartData;
  xAxisCategoriesShownCount: number;
  fetchedRowCount: number;
  xAxisScrollPosition?: number;
  isFetchingData?: boolean;
  selectedDataPointIndex?: number;
  drillDowns?: DrillDown[];
  selectedDataPoints: DataPoint[];
  isExportMenuOpen?: boolean;
  exportMenuCloseTimeoutID?: ReturnType<typeof setTimeout> | 0;
  menuConfirmationType?: ChartMenuConfirmationType;
  map: any;

  addSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    aggregationFunction: AggregationFunction,
    visualizationType: MeasureVisualizationType
  ): void;

  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType): void;

  changeSelectedDimensionColor(selectedDimension: SelectedDimension, color: string): void;

  changeSelectedMeasureColor(selectedMeasure: SelectedMeasure, color: string): void;

  changeSelectedMeasureTypeAndColor(
    selectedMeasure: SelectedMeasure,
    visualizationType: MeasureVisualizationType,
    color: string
  ): void;

  changeSelectedMeasureAggregationFunction(
    selectedMeasure: SelectedMeasure,
    aggregationFunction: AggregationFunction
  ): void;

  createView(
    width: number,
    height: number,
    stateNamespace: ChartAreaStateNamespace,
    actions: Record<string, (...args: any[]) => void>
  ): JSX.Element;

  getConvertedSelectedDimensions(): SelectedDimension[];

  getConvertSelectedMeasures(): SelectedMeasure[];

  getMaxScrollPosition(): number;

  deselectDataPoint(dataPoint: DataPoint): void;

  drillDown(drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension): void;

  drillUp(): boolean;

  getHeight(layout: GridItem[], chartAreaHeight: number): number;

  getWidth(layout: GridItem[], chartAreaWidth: number): number;

  exportToPng(): void;

  exportToPdf(): void;

  exportToSvg(): void;

  getAllColors(theme: Theme): string[];

  getApexDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[];

  getApexType(): string;

  getApexXAxisOptions(): object;

  getApexYAxisTitleOptions(): object;

  getConfigHintSubtitle(): string;

  getConfigHintTitle(): string;

  getColors(): string[];

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element>;

  getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element>;

  getLabels(): any[] | null | undefined;

  getMeasureVisualizationColorFor(
    selectedMeasure: SelectedMeasure,
    measureVisualizationType: MeasureVisualizationType
  ): string;

  getNextDimensionVisualizationType(): DimensionVisualizationType;

  getNextDrillDownSelectedDimension(): SelectedDimension;

  getNextMeasureVisualizationType(
    measureVisualizationType?: MeasureVisualizationType,
    selectedMeasureIndex?: number
  ): MeasureVisualizationType;

  getPreviousDrillDownSelectedDimension(): SelectedDimension;

  getRadiusTypeSelectedMeasureForColor(color: string): SelectedMeasure | null | undefined;

  getSelectedDimensionOfType(visualizationType: DimensionVisualizationType): SelectedDimension | null | undefined;

  getStrokeWidth(): number | number[];

  getSubtitleText(): string;

  getTitleText(stateNamespace: ChartAreaStateNamespace): string;

  getName(stateNamespace: ChartAreaStateNamespace): string;

  getValidAggregationFunction(aggregationFunction: AggregationFunction): AggregationFunction;

  getConfiguration(): ChartConfiguration;

  getDataForSelectedDimensionOfType(dimensionVisualizationType: DimensionVisualizationType): Array<any>;

  getFillOpacity(): number;

  getFillType(): FillType;

  getGradientFillType(): FillType | FillType[];

  getLegendType(): string;

  getNewChartOfType(newChartType: ChartType): Chart;

  getPrimarySelectedDimensionType(): DimensionVisualizationType | null;

  getFilters(): Filter[];

  getSorts(): Sort[];

  getSupportedAggregationFunctions(): AggregationFunction[];

  getSupportedMeasureVisualizationTypes(
    selectedMeasure: SelectedMeasure,
    supportedMeasureVisualizationTypes?: MeasureVisualizationType[]
  ): MeasureVisualizationType[];

  getTooltipXValueFormatter(): ((value: any, params: object) => string) | null | undefined;

  getTooltipYValueFormatter(): ((value: any, params: object) => string) | null | undefined;

  getColumns(): Column[];

  handleDataPointSelectionOrDrilldown(
    event: object,
    chartContext: object,
    params: object,
    stateNamespace: ChartAreaStateNamespace,
    actions: Record<string, (...args: any[]) => void>
  ): void;

  hasData(): boolean;

  isPieOrDonutWithMultipleMeasuresOnly(): boolean;

  hasFloatingSubtitle(): boolean;

  hasFloatingTitle(): boolean;

  hasIntersectTooltip(): boolean;

  hasFollowCursorTooltip(): boolean;

  hasLargerTitle(): boolean;

  hasNonTimestampLegend(): boolean;

  hasSelectedDimensionOfType(visualizationType: DimensionVisualizationType): boolean;

  hasSelectedMeasureOfType(visualizationType: MeasureVisualizationType): boolean;

  hasSharedTooltip(): boolean;

  hasTimestampLegend(): boolean;

  hasTimestampXAxis(): boolean;

  hasContinuousXAxis(): boolean;

  isXAxisScrollable(): boolean;

  isZoomable(): boolean;

  isTimelineChart(): boolean;

  mergeData(columnNameToValuesMap: ColumnNameToValuesMap): void;

  removeSelectedDimension(selectedDimension: SelectedDimension): void;

  removeSelectedMeasure(selectedMeasure: SelectedMeasure): void;

  selectDataPoint(dataPoint: DataPoint): void;

  setData(columnNameToValuesMap: ColumnNameToValuesMap): void;

  setIsFetchingData(isFetchingCharData: boolean): void;

  shouldShowAsSparkline(): boolean;

  shouldShowDataLabelsDropShadow(): boolean;

  shouldShowGrid(): boolean;

  shouldShowStroke(): boolean;

  shouldShowYAxisTooltip(): boolean;

  shouldShowDataLabels(): boolean;

  shouldShowLegend(): [boolean, LegendPosition];

  sliceOrFillXAxisData(data: Array<any>): Array<any>;

  supportsDataPointsCount(): boolean;

  supportsLegend(): boolean;

  supportsTooltipSelectedDimension(): boolean;

  supportsAllDimension(): boolean;

  supportsSelectedDimensionVisualizationColor(): boolean;

  supportsSelectedMeasureVisualizationColor(): boolean;

  setMap(map: any): void;
}
