// @flow

import _ from 'lodash';
import React from 'react';
import { List, Tab } from 'semantic-ui-react';
import styles from './SelectorTabView.module.scss';

type Props = {
  firstNoContentLineText?: string;
  firstTabPaneListItems: Array<JSX.Element>;
  firstTabPaneName: string;
  secondNoContentLineText?: string;
  secondTabPaneListItems: Array<JSX.Element>;
  secondTabPaneName: string;
  thirdTabPaneListItems?: Array<JSX.Element>;
  thirdTabPaneName?: string;
};

const SelectorTabView: React.FC<Props> = ({
  firstNoContentLineText,
  firstTabPaneListItems,
  firstTabPaneName,
  secondNoContentLineText,
  secondTabPaneListItems,
  secondTabPaneName,
  thirdTabPaneListItems,
  thirdTabPaneName
}: Props) => {
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
      render: () => <Tab.Pane attached={false}>{firstTabPaneContent}</Tab.Pane>
    },
    {
      menuItem: secondTabPaneName,
      render: () => <Tab.Pane attached={false}>{secondTabPaneContent}</Tab.Pane>
    }
  ];

  if (thirdTabPaneListItems && thirdTabPaneName) {
    tabPanes.push({
      menuItem: thirdTabPaneName,
      render: () => (
        <Tab.Pane attached={false}>
          <List>{thirdTabPaneListItems}</List>
        </Tab.Pane>
      )
    });
  }

  return (
    <section className={styles.tabs}>
      <Tab
        menu={{
          secondary: true,
          pointing: true
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
  thirdTabPaneName: ''
};

export default SelectorTabView;
