// @flow

import React from 'react';
import type { Element } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './DataScopePickerView.module.scss';
import type { DataScopeType } from '../../model/state/types/DataScopeType';

type Props = $Exact<{
  changeDataScopeType: (DataScopeType) => void,
  selectedDataScopeType: DataScopeType,
}>;

const DataScopePickerView = ({ changeDataScopeType, selectedDataScopeType }: Props): Element<any> => (
  <Dropdown className={styles.icon} icon={selectedDataScopeType === 'all' ? 'database' : 'desktop'}>
    <Dropdown.Menu direction="left">
      <Dropdown.Item
        text="Filter fetched data"
        value="already fetched"
        onClick={(event: SyntheticEvent<HTMLElement>, { value: dataScopeType }: Object) =>
          changeDataScopeType(dataScopeType)
        }
      />
      <Dropdown.Item
        text="Filter all data"
        value="all"
        onClick={(event: SyntheticEvent<HTMLElement>, { value: dataScopeType }: Object) =>
          changeDataScopeType(dataScopeType)
        }
      />
    </Dropdown.Menu>
  </Dropdown>
);

export default DataScopePickerView;
