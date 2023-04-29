import React, { useMemo } from 'react';
import { Dropdown, Popup } from 'semantic-ui-react';
import type { SelectedMeasure } from '../../../../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Chart } from '../../../../../../../../../../common/components/chartarea/chart/model/state/Chart';
import type { MeasureVisualizationType } from '../../../../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import SelectedMeasureVisualizationTypeIconFactory from '../iconfactory/SelectedMeasureVisualizationTypeIconFactory';
import styles from '../../listitem/SelectedMeasureListItemView.module.scss';

type Props = {
  changeVisualizationType: (visualizationType: MeasureVisualizationType) => void;
  chart: Chart;
  selectedMeasure: SelectedMeasure;
};

const SelectedMeasureVisualizationTypeDropdownView = ({ changeVisualizationType, chart, selectedMeasure }: Props) => {
  const visualizationTypeDropdownMenuItems = useMemo(
    () =>
      chart
        .getSupportedMeasureVisualizationTypes(selectedMeasure)
        .map((visualizationType: MeasureVisualizationType) => (
          <Dropdown.Item
            key={visualizationType}
            text={visualizationType}
            value={visualizationType}
            onClick={() => changeVisualizationType(visualizationType)}
          />
        )),
    [changeVisualizationType, chart, selectedMeasure]
  );

  const visualizationTypeIcon = SelectedMeasureVisualizationTypeIconFactory.createMeasureVisualizationTypeIcon(
    selectedMeasure.visualizationType,
    chart.selectedDimensions.length === 0
  );

  if (chart.type === 'candlestick') {
    return (
      <Dropdown
        className={styles.candlestickVisualizationTypeSelector}
        text={selectedMeasure.visualizationType.toUpperCase().charAt(0)}
      >
        <Dropdown.Menu>{visualizationTypeDropdownMenuItems}</Dropdown.Menu>
      </Dropdown>
    );
  } else if (visualizationTypeDropdownMenuItems.length > 0) {
    return (
      <Popup
        mouseEnterDelay={1000}
        trigger={
          <Dropdown icon={visualizationTypeIcon}>
            <Dropdown.Menu>{visualizationTypeDropdownMenuItems}</Dropdown.Menu>
          </Dropdown>
        }
        content="Change visualization type"
        inverted
      />
    );
  } else {
    return null;
  }
};

export default SelectedMeasureVisualizationTypeDropdownView;
