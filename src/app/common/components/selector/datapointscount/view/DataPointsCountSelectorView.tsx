/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NumberInput from 'semantic-ui-react-numberinput';
import styles from './DataPointsCountSelectorView.module.scss';
import SelectorView from '../../view/SelectorView';
import type { DataPointsCountSelectorStateNamespace } from '../model/state/DataPointsCountSelectorStateNamespace';
import Constants from '../../../../Constants';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/dataPointsCountSelectorController';

export type OwnProps = { stateNamespace: DataPointsCountSelectorStateNamespace };
type Props = OwnProps & State & ActionDispatchers;

const DataPointsCountSelectorView = ({
  changeFetchedRowCountForSelectedChart,
  changeXAxisCategoriesShownCountForSelectedChart,
  selectedChart,
  stateNamespace
}: Props) => {
  let xAxisCategoriesShownCountInput;

  if (selectedChart.supportsDataPointsCount()) {
    xAxisCategoriesShownCountInput = (
      <div className={styles.xAxisCategoriesShownCount}>
        <div className={styles.label}>Number of shown X-axis categories</div>
        <NumberInput
          buttonPlacement="right"
          className={styles.numberInput}
          doubleClickStepAmount={10}
          maxLength={5}
          maxValue={Constants.MAX_X_AXIS_CATEGORIES_SHOWN_COUNT}
          minValue={1}
          value={selectedChart.xAxisCategoriesShownCount.toString()}
          onChange={(value: string) => changeXAxisCategoriesShownCountForSelectedChart(value)}
        />
      </div>
    );
  }

  const selectorStateNamespace = `${stateNamespace}DataPointsCountSelector`;

  return (
    <SelectorView
      id={selectorStateNamespace}
      titleText={selectedChart.supportsDataPointsCount() ? 'SHOWN/FETCHED DATA' : 'FETCHED DATA'}
      position="rightPane"
      selectorStateNamespace={(selectorStateNamespaces as any)[selectorStateNamespace]}
      selectorContent={
        <>
          {xAxisCategoriesShownCountInput}
          <div className={styles.fetchedRowCount}>
            <div className={styles.label}>Max number of database rows to fetch</div>
            <NumberInput
              buttonPlacement="right"
              className={styles.numberInput}
              doubleClickStepAmount={250}
              maxLength={5}
              maxValue={Constants.MAX_FETCHED_ROWS_COUNT}
              minValue={1}
              value={selectedChart.fetchedRowCount.toString()}
              onChange={(value: string) => changeFetchedRowCountForSelectedChart(value)}
              stepAmount={100}
            />
          </div>
        </>
      }
    />
  );
};

export default connect(
  controller.getState,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(DataPointsCountSelectorView);
