// @flow

import _ from 'lodash';
import type { Element } from 'react';
import React from 'react';
import { List, Tab } from 'semantic-ui-react';
import styles from './SelectorTabView.module.scss';

type Props = $Exact<{
  firstNoContentLineText?: string,
  firstTabPaneListItems: Array<Element<any>>,
  firstTabPaneName: string,
  secondNoContentLineText?: string,
  secondTabPaneListItems: Array<Element<any>>,
  secondTabPaneName: string,
  thirdTabPaneListItems?: Array<Element<any>>,
  thirdTabPaneName?: string,
}>;

const SelectorTabView = ({
  firstNoContentLineText,
  firstTabPaneListItems,
  firstTabPaneName,
  secondNoContentLineText,
  secondTabPaneListItems,
  secondTabPaneName,
  thirdTabPaneListItems,
  thirdTabPaneName,
}: Props): Element<any> => {
  let firstTabPaneContent = <List>{firstTabPaneListItems}</List>;

  if (_.isEmpty(firstTabPaneListItems) && firstNoContentLineText) {
    firstTabPaneContent = (
      <div className={styles.noTabPaneContent}>
        {firstNoContentLineText}
        <br />
        {secondNoContentLineText}
      </div>
    );
  }

  let secondTabPaneContent = <List>{secondTabPaneListItems}</List>;

  if (_.isEmpty(secondTabPaneListItems) && firstNoContentLineText) {
    secondTabPaneContent = (
      <div className={styles.noTabPaneContent}>
        {firstNoContentLineText}
        <br />
        {secondNoContentLineText}
      </div>
    );
  }

  const tabPanes = [
    {
      menuItem: firstTabPaneName,
      render: () => <Tab.Pane attached={false}>{firstTabPaneContent}</Tab.Pane>,
    },
    {
      menuItem: secondTabPaneName,
      render: () => <Tab.Pane attached={false}>{secondTabPaneContent}</Tab.Pane>,
    },
  ];

  if (thirdTabPaneListItems) {
    tabPanes.push({
      menuItem: thirdTabPaneName,
      render: () => (
        <Tab.Pane attached={false}>
          <List>{thirdTabPaneListItems}</List>
        </Tab.Pane>
      ),
    });
  }

  return (
    <section className={styles.tabs}>
      <Tab
        menu={{
          secondary: true,
          pointing: true,
        }}
        panes={tabPanes}
      />
    </section>
  );
};

SelectorTabView.defaultProps = {
  firstNoContentLineText: '',
  secondNoContentLineText: '',
  thirdTabPaneListItems: undefined,
  thirdTabPaneName: '',
};

export default SelectorTabView;
