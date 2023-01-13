import React, { useMemo } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './VisualizationColorPickerView.module.scss';
import type { Theme } from '../../../dataexplorerpage/settings/state/entities/Theme';

type Props = {
  changeVisualizationColor: (color: string) => void;
  currentColor: string | null | undefined;
  theme: Theme;
};

const VisualizationColorPickerView = ({ changeVisualizationColor, currentColor, theme }: Props) => {
  const colorMenuItems = useMemo(
    () =>
      theme.colors.map((themeColor: string) => (
        <Dropdown.Item
          key={themeColor}
          style={{ color: themeColor }}
          icon="meanpath"
          value={themeColor}
          onClick={() => changeVisualizationColor(themeColor)}
        />
      )),
    [changeVisualizationColor, theme.colors]
  );

  return (
    <Dropdown
      upward={false}
      icon=""
      className={styles.visualizationColorPicker}
      style={{ backgroundColor: currentColor }}
    >
      <Dropdown.Menu>{colorMenuItems}</Dropdown.Menu>
    </Dropdown>
  );
};

export default VisualizationColorPickerView;
