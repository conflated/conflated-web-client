import _ from 'lodash';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Icon, Popup } from 'semantic-ui-react';
import styles from './ChartMenuView.module.scss';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import type { Chart } from '../../model/state/Chart';
import { ActionDispatchers, controller } from '../controller/chartMenuController';

// eslint-disable-next-line react/no-unused-prop-types
type OwnProps = { chart: Chart; className: string; stateNamespace: ChartAreaStateNamespace };
type Props = OwnProps & ActionDispatchers;

const ChartMenuView = ({
  allowMenuToBeOpened,
  chart,
  className,
  clear,
  clearOrRemove,
  closeExportMenu,
  copy,
  hideConfirmation,
  openExportMenu,
  paste,
  showClearConfirmation,
  showDeleteConfirmation
}: Props) => {
  const handleEnterMenuExportItem = useCallback(() => {
    if (!chart.isExportMenuOpen) {
      openExportMenu(chart);
    }
  }, [chart, openExportMenu]);

  const handleLeaveMenuExportItem = useCallback(() => {
    closeExportMenu(chart);
  }, [chart, closeExportMenu]);

  const cutChart = useCallback(() => {
    copy(chart);
    clear(chart);
  }, [chart, clear, copy]);

  const handleCancelButtonClick = useCallback(() => {
    hideConfirmation(chart);

    setTimeout(() => {
      allowMenuToBeOpened(chart);
    }, 0);
  }, [allowMenuToBeOpened, chart, hideConfirmation]);

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
      <Dropdown
        open={hasConfirmAction}
        size="large"
        floating
        direction="left"
        icon={
          <Popup
            inverted
            mouseEnterDelay={1000}
            trigger={<Icon className={styles.icon} name="ellipsis vertical" />}
            content="Open chart menu"
          />
        }
      >
        <Dropdown.Menu>
          <Dropdown.Item
            className={styles.menuItemWithKeyboardShortcut}
            disabled={hasConfirmAction}
            value="copy"
            onClick={() => copy(chart)}
          >
            <div>
              <Icon name="copy" />
              <span>Copy</span>
            </div>
            <span className={styles.keyboardShortcut}>Ctrl-C</span>
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.menuItemWithKeyboardShortcut}
            disabled={hasConfirmAction}
            value="paste"
            onClick={() => paste(chart)}
          >
            <div>
              <Icon name="paste" />
              <span>Paste</span>
            </div>
            <span className={styles.keyboardShortcut}>Ctrl-V</span>
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.menuItemWithKeyboardShortcut}
            disabled={hasConfirmAction}
            value="cut"
            onClick={cutChart}
          >
            <div>
              <Icon name="cut" />
              <span>Cut</span>
            </div>
            <span className={styles.keyboardShortcut}>Ctrl-X</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown
            disabled={hasConfirmAction}
            open={chart.isExportMenuOpen}
            text="Export as"
            pointing="right"
            icon
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
            icon="erase"
            text={`Clear chart${chart.menuConfirmationType === 'clear' ? '?' : ''}`}
            value="clear"
            onClick={() => showClearConfirmation(chart)}
          />
          <Dropdown.Item
            disabled={chart.menuConfirmationType === 'clear'}
            className={`${styles.menuItemWithKeyboardShortcut} ${
              chart.menuConfirmationType === 'delete' ? styles.dangerItem : ''
            }`}
            value="delete"
            onClick={() => showDeleteConfirmation(chart)}
          >
            <div>
              <Icon name="trash" />
              <span>{`Delete chart${chart.menuConfirmationType === 'delete' ? '?' : ''}`}</span>
            </div>
            <span className={styles.keyboardShortcut}>Del</span>
          </Dropdown.Item>
          {chart.menuConfirmationType ? (
            <Dropdown.Item className={styles.buttonsArea}>
              <Button size="tiny" color="red" onClick={() => clearOrRemove(chart)}>
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

export default connect(
  null,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(ChartMenuView);
