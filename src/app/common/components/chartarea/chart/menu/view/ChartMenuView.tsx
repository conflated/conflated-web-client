import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import styles from './ChartMenuView.module.scss';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../model/state/Chart';
import { ActionDispatchers, controller } from '../chartMenuController';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; className: string; pageStateNamespace: ChartAreaPageStateNamespace };
type Props = OwnProps & ActionDispatchers;

const ChartMenuView = ({
  allowChartMenuToBeOpened,
  chart,
  className,
  clearChart,
  clearOrRemoveChart,
  closeChartExportMenu,
  copyChart,
  hideChartMenuActionConfirmation,
  openChartExportMenu,
  pasteChart,
  showClearChartConfirmationInChartMenu,
  showDeleteChartConfirmationInChartMenu,
  updateChartExportMenuCloseTimeoutId
}: Props) => {
  const handleEnterMenuExportItem = useCallback(() => {
    if (!chart.isExportMenuOpen) {
      openChartExportMenu(chart);
    }
  }, [chart, openChartExportMenu]);

  const handleLeaveMenuExportItem = useCallback(() => {
    const timeoutID = setTimeout(() => {
      closeChartExportMenu(chart);
    }, 200);

    updateChartExportMenuCloseTimeoutId(chart, timeoutID);
  }, [chart, closeChartExportMenu, updateChartExportMenuCloseTimeoutId]);

  const cutChart = useCallback(() => {
    copyChart(chart);
    clearChart(chart);
  }, [chart, clearChart, copyChart]);

  const handleCancelButtonClick = useCallback(() => {
    hideChartMenuActionConfirmation(chart);

    setTimeout(() => {
      allowChartMenuToBeOpened(chart);
    }, 0);
  }, [allowChartMenuToBeOpened, chart, hideChartMenuActionConfirmation]);

  const hasConfirmAction = (() => {
    if (chart.menuConfirmationType === 'none') {
      return false;
    } else if (chart.menuConfirmationType) {
      return true;
    }

    return undefined;
  })();

  return (
    <div className={className}>
      <Dropdown open={hasConfirmAction} size="large" floating direction="left" icon={<Icon name="bars" size="large" />}>
        <Dropdown.Menu>
          <Dropdown.Item
            className={styles.menuItemWithKeyboardShortcut}
            disabled={hasConfirmAction}
            value="copy"
            onClick={() => copyChart(chart)}
          >
            <span>Copy</span>
            <span className={styles.keyboardShortcut}>Ctrl-C</span>
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.menuItemWithKeyboardShortcut}
            disabled={hasConfirmAction}
            value="paste"
            onClick={() => pasteChart(chart)}
          >
            <span>Paste</span>
            <span className={styles.keyboardShortcut}>Ctrl-V</span>
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.menuItemWithKeyboardShortcut}
            disabled={hasConfirmAction}
            value="cut"
            onClick={cutChart}
          >
            <span>Cut</span>
            <span className={styles.keyboardShortcut}>Ctrl-X</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown
            disabled={hasConfirmAction}
            open={chart.isExportMenuOpen}
            icon=""
            text="Export as"
            pointing="right"
            item
            onMouseEnter={handleEnterMenuExportItem}
            onMouseLeave={handleLeaveMenuExportItem}
            onMouseMove={handleEnterMenuExportItem}
          >
            <Dropdown.Menu onMouseEnter={handleEnterMenuExportItem} onMouseLeave={handleLeaveMenuExportItem}>
              <Dropdown.Item text="PNG" value="png" onClick={chart.exportToPng} />
              <Dropdown.Item text="PDF" value="pdf" onClick={chart.exportToPdf} />
              <Dropdown.Item text="SVG" value="svg" onClick={chart.exportToSvg} />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Divider />
          <Dropdown.Item
            disabled={chart.menuConfirmationType === 'delete'}
            className={chart.menuConfirmationType === 'clear' ? styles.dangerItem : ''}
            text={`Clear chart${chart.menuConfirmationType === 'clear' ? '?' : ''}`}
            value="clear"
            onClick={() => showClearChartConfirmationInChartMenu(chart)}
          />
          <Dropdown.Item
            disabled={chart.menuConfirmationType === 'clear'}
            className={`${styles.menuItemWithKeyboardShortcut} ${
              chart.menuConfirmationType === 'delete' ? styles.dangerItem : ''
            }`}
            value="delete"
            onClick={() => showDeleteChartConfirmationInChartMenu(chart)}
          >
            <span>{`Delete chart${chart.menuConfirmationType === 'delete' ? '?' : ''}`}</span>
            <span className={styles.keyboardShortcut}>Del</span>
          </Dropdown.Item>
          {chart.menuConfirmationType ? (
            <Dropdown.Item className={styles.buttonsArea}>
              <Button size="tiny" color="red" onClick={() => clearOrRemoveChart(chart)}>
                {chart.menuConfirmationType.toUpperCase()}
              </Button>
              <Button size="tiny" secondary onClick={handleCancelButtonClick}>
                CANCEL
              </Button>
            </Dropdown.Item>
          ) : undefined}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default connect(controller.getState, (_, { pageStateNamespace }: OwnProps) =>
  controller.getActionDispatchers(pageStateNamespace)
)(ChartMenuView);
