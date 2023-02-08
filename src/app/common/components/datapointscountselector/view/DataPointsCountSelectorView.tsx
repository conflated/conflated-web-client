/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NumberInput from 'semantic-ui-react-numberinput';
import styles from './DataPointsCountSelectorView.module.scss';
import SelectorView from '../../selector/view/SelectorView';
import type { DataPointsCountSelectorPageStateNamespace } from '../model/state/DataPointsCountSelectorPageStateNamespace';
import Constants from '../../../Constants';
import selectorStateNamespaces from '../../selector/model/state/namespace/SelectorStateNamespace';
import { ActionDispatchers, controller, State } from '../dataPointsCountSelectorController';
import { AppState } from '../../../../../store/AppState';

type OwnProps = { pageStateNamespace: DataPointsCountSelectorPageStateNamespace };
type Props = OwnProps & State & ActionDispatchers;

const DataPointsCountSelectorView = ({
  changeFetchedRowCountForSelectedChart,
  changeXAxisCategoriesShownCountForSelectedChart,
  selectedChart,
  pageStateNamespace
}: Props) => {
  let xAxisCategoriesShownCountInput;

  if (selectedChart.supportsDataPointsCount()) {
    xAxisCategoriesShownCountInput = (
      <div className={styles.xAxisCategoriesShownCount}>
        <div className={styles.label}>Show X-axis categories</div>
        <NumberInput
          buttonPlacement="right"
          className={styles.numberInput}
          maxLength={5}
          maxValue={Constants.MAX_X_AXIS_CATEGORIES_SHOWN_COUNT}
          minValue={1}
          value={selectedChart.xAxisCategoriesShownCount.toString()}
          onChange={(value: string) => changeXAxisCategoriesShownCountForSelectedChart(value)}
        />
      </div>
    );
  }

  const selectorStateNamespace = `${pageStateNamespace}DataPointsCountSelector`;

  return (
    <SelectorView
      id={selectorStateNamespace}
      titleText={selectedChart.supportsDataPointsCount() ? 'SHOWN/FETCHED DATA' : 'FETCHED DATA'}
      selectorStateNamespace={(selectorStateNamespaces as any)[selectorStateNamespace]}
      selectorContent={
        <>
          {xAxisCategoriesShownCountInput}
          <div className={styles.fetchedRowCount}>
            <div className={styles.label}>Fetch database rows</div>
            <NumberInput
              buttonPlacement="right"
              className={styles.numberInput}
              maxLength={5}
              maxValue={Constants.MAX_FETCHED_ROWS_COUNT}
              minValue={1}
              value={selectedChart.fetchedRowCount.toString()}
              onChange={(value: string) => changeFetchedRowCountForSelectedChart(value)}
            />
          </div>
        </>
      }
    />
  );
};

export default connect(
  (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
  (_, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
)(DataPointsCountSelectorView);
