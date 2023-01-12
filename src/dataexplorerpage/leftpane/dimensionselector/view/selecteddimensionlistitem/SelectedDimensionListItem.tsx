import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import styles from './SelectedDimensionListItem.module.scss';
import type { Theme } from '../../../../settings/state/entities/Theme';
import type { SelectedDimension } from '../../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import VisualizationColorPickerView from '../../../../../common/view/visualizationcolorpicker/VisualizationColorPickerView';

type Props = {
  changeVisualizationColor: (visualizationColor: string) => void;
  removeSelectedDimension: (selectedDimension: SelectedDimension) => void;
  selectedDimension: SelectedDimension;
  shouldShowVisualizationColorPicker: boolean;
  theme: Theme;
};

export default function SelectedDimensionListItem({
  changeVisualizationColor,
  removeSelectedDimension,
  selectedDimension,
  shouldShowVisualizationColorPicker,
  theme
}: Props) {
  const visualizationColorPicker = (() => {
    if (shouldShowVisualizationColorPicker) {
      return (
        <VisualizationColorPickerView
          changeVisualizationColor={changeVisualizationColor}
          currentColor={selectedDimension.visualizationColor}
          theme={theme}
        />
      );
    }

    return undefined;
  })();

  return (
    <List.Item className={styles.listItem}>
      {visualizationColorPicker}
      <div className={styles.dimensionName}>{selectedDimension.dimension.name}</div>
      <div className={styles.visualizationType}>{selectedDimension.visualizationType}</div>
      <Icon className={styles.removeIcon} name="close" onClick={() => removeSelectedDimension(selectedDimension)} />
    </List.Item>
  );
}
