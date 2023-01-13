import React, { useMemo } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styles from './AggregationFunctionPickerView.module.scss';
import type { AggregationFunction } from '../../components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';

type Props = {
  aggregationFunctions: AggregationFunction[];
  changeAggregationFunction: (aggregationFunction: AggregationFunction) => void;
  selectedAggregationFunction: AggregationFunction;
};

const AggregationFunctionPickerView = ({
  aggregationFunctions,
  changeAggregationFunction,
  selectedAggregationFunction
}: Props) => {
  const aggregationFunctionDropdownMenuItems = useMemo(
    () =>
      aggregationFunctions.map((aggregationFunction: AggregationFunction) => (
        <Dropdown.Item
          key={aggregationFunction}
          text={aggregationFunction}
          onClick={() => changeAggregationFunction(aggregationFunction)}
        />
      )),
    [aggregationFunctions, changeAggregationFunction]
  );

  return (
    <Dropdown className={styles.aggregationFunctionPicker} text={selectedAggregationFunction}>
      <Dropdown.Menu>{aggregationFunctionDropdownMenuItems}</Dropdown.Menu>
    </Dropdown>
  );
};

export default AggregationFunctionPickerView;
