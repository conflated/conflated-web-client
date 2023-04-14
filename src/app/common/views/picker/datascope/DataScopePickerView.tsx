/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './DataScopePickerView.module.scss';
import type { DataScopeType } from '../../../components/chartarea/chart/model/state/types/DataScopeType';

type Props = {
  changeDataScopeType: (dataScopeType: DataScopeType) => void;
  selectedDataScopeType: DataScopeType;
};

const DataScopePickerView = ({ changeDataScopeType, selectedDataScopeType }: Props) => (
  <Dropdown className={styles.icon} icon={selectedDataScopeType === 'all' ? 'database' : 'desktop'}>
    <Dropdown.Menu direction="left">
      <Dropdown.Item
        text="Filter only already fetched data"
        value="already fetched"
        onClick={(event: React.SyntheticEvent<HTMLElement>, { value: dataScopeType }: any) =>
          changeDataScopeType(dataScopeType)
        }
      />
      <Dropdown.Item
        text="Filter all data"
        value="all"
        onClick={(event: React.SyntheticEvent<HTMLElement>, { value: dataScopeType }: any) =>
          changeDataScopeType(dataScopeType)
        }
      />
    </Dropdown.Menu>
  </Dropdown>
);

export default DataScopePickerView;
