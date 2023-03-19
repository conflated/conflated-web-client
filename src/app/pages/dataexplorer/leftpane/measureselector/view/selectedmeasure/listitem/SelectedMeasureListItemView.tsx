import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import styles from './SelectedMeasureListItemView.module.scss';
import type { SelectedMeasure } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Theme } from '../../../../../model/state/types/Theme';
import type { AggregationFunction } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import type { Chart } from '../../../../../../../common/components/chartarea/chart/model/state/Chart';
import VisualizationColorPickerView from '../../../../../../../common/view/picker/visualizationcolor/VisualizationColorPickerView';
import AggregationFunctionPickerView from '../../../../../../../common/view/picker/aggregationfunction/AggregationFunctionPickerView';
import SelectedMeasureVisualizationTypeDropdownView from '../visualizationtype/dropdown/SelectedMeasureVisualizationTypeDropdownView';

type Props = {
  changeAggregationFunction: (aggregationFunction: AggregationFunction) => void;
  changeVisualizationColor: (visualizationColor: string) => void;
  changeVisualizationType: (visualizationType: MeasureVisualizationType) => void;
  chart: Chart;
  removeSelectedMeasure: (selectedMeasure: SelectedMeasure) => void;
  selectedMeasure: SelectedMeasure;
  theme: Theme;
};

const SelectedMeasureListItemView = ({
  changeAggregationFunction,
  changeVisualizationColor,
  changeVisualizationType,
  chart,
  removeSelectedMeasure,
  selectedMeasure,
  theme
}: Props) => {
  const visualizationColorPicker = (() => {
    if (chart.supportsSelectedMeasureVisualizationColor()) {
      return (
        <VisualizationColorPickerView
          changeVisualizationColor={changeVisualizationColor}
          currentColor={selectedMeasure.visualizationColor}
          theme={theme}
        />
      );
    }

    return undefined;
  })();

  return (
    <List.Item className={styles.selectedListItem} key={selectedMeasure.measure.name}>
      {visualizationColorPicker}
      <SelectedMeasureVisualizationTypeDropdownView
        changeVisualizationType={changeVisualizationType}
        chart={chart}
        selectedMeasure={selectedMeasure}
      />
      <AggregationFunctionPickerView
        aggregationFunctions={chart.getSupportedAggregationFunctions()}
        changeAggregationFunction={changeAggregationFunction}
        selectedAggregationFunction={selectedMeasure.aggregationFunction}
      />
      <div className={styles.measureName}>{selectedMeasure.measure.name}</div>
      <Icon className={styles.removeIcon} name="close" onClick={() => removeSelectedMeasure(selectedMeasure)} />
    </List.Item>
  );
};

export default SelectedMeasureListItemView;
