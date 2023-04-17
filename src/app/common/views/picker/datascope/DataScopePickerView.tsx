/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './DataScopePickerView.module.scss';
import type { DataScope } from '../../../components/chartarea/chart/model/state/types/DataScope';

type Props = {
  changeDataScopeType: (dataScopeType: DataScope) => void;
  className: string;
  selectedDataScopeType: DataScope;
};

const DataScopePickerView = ({ changeDataScopeType, className, selectedDataScopeType }: Props) => (
  <Dropdown className={`${styles.icon} ${className}`} icon={selectedDataScopeType === 'all' ? 'database' : 'desktop'}>
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
