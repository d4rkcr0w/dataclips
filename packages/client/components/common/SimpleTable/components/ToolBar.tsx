import {
  ColumnHeightOutlined,
  DownloadOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Checkbox, Divider, Dropdown, Menu, Popover, Tooltip } from "antd";
import update from "immutability-helper";
import React, { ReactElement, useCallback, useMemo } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import styled from "styled-components";

import { TableSize } from "../enums/TableSize";
import { ColumnSettingType } from "../interfaces/ColumnSettingType";
import { PositionType } from "../interfaces/PositionType";
import { ToolBarProps } from "../interfaces/ToolBarProps";
import DndCheckbox from "./DndCheckbox";

const StyledToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 64px;
  padding: 0 16px;

  line-height: 64px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const resortColumnsSettings = (
  columnsSettings: ColumnSettingType[]
): ColumnSettingType[] => {
  let fixedLeftIndex = 0;
  let noFixedIndex = 0;
  const newArr = [];
  columnsSettings.forEach((item) => {
    if (!item.fixed) {
      newArr.splice(noFixedIndex, 0, item);
      noFixedIndex++;
    } else if (item.fixed === "left") {
      newArr.splice(fixedLeftIndex, 0, item);
      fixedLeftIndex++;
      noFixedIndex++;
    } else {
      newArr.push(item);
    }
  });
  return newArr;
};

export const ToolBar = <T extends {}>({
  columns,
  columnSettings,
  options,
  toolBarRender,
  onColumnSettingsChange,
  onDownload,
  onRefresh,
  onSizeChange,
}: ToolBarProps<T>): ReactElement => {
  const actions = toolBarRender ? toolBarRender() : [];

  const showColumnKeys = useMemo(
    (): string[] =>
      columnSettings
        .filter((columnSetting): boolean => !columnSetting.hidden)
        .map((columnSetting): string => `${columnSetting.key}`),
    [columnSettings]
  );

  const handleConfigsChange = useCallback(
    (dragIndex: number, hoverIndex: number, fixed?: PositionType): void => {
      if (fixed || fixed === false) {
        // ???????????????
        const tempColumnSettings = [...columnSettings];
        tempColumnSettings[dragIndex].fixed = fixed;
        // ???????????????fixed ??????????????????
        const resortedColumnSettings =
          resortColumnsSettings(tempColumnSettings);
        onColumnSettingsChange(resortedColumnSettings);
      } else {
        // ???????????????
        if (!columnSettings[hoverIndex]?.fixed) {
          onColumnSettingsChange(
            resortColumnsSettings(
              update(columnSettings, {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, columnSettings[dragIndex]],
                ],
              })
            )
          );
        }
      }
    },
    [columnSettings, onColumnSettingsChange]
  );

  return (
    <StyledToolBar>
      <Option>
        {actions.map(
          (action, index): ReactElement => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ marginRight: 8 }}>
              {action}
            </div>
          )
        )}

        {actions.length > 0 ? <Divider type="vertical" /> : null}

        {options && options?.download ? (
          <div style={{ marginLeft: 8 }}>
            <Tooltip title="??????">
              <DownloadOutlined
                spin={false}
                style={{ fontSize: 17 }}
                onClick={onDownload}
              />
            </Tooltip>
          </div>
        ) : null}

        {options && options?.size ? (
          <div style={{ marginLeft: 16 }}>
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }): void => onSizeChange(key as TableSize)}
                >
                  <Menu.Item key={TableSize.LARGE}>??????</Menu.Item>
                  <Menu.Item key={TableSize.MIDDLE}>??????</Menu.Item>
                  <Menu.Item key={TableSize.SMALL}>??????</Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Tooltip title="??????">
                <ColumnHeightOutlined style={{ fontSize: 16 }} />
              </Tooltip>
            </Dropdown>
          </div>
        ) : null}

        {options && options?.reload ? (
          <div style={{ marginLeft: 16 }}>
            <Tooltip title="??????">
              <SyncOutlined
                spin={false}
                style={{ fontSize: 16, cursor: "pointer" }}
                onClick={onRefresh}
              />
            </Tooltip>
          </div>
        ) : null}

        {options && options?.setting ? (
          <div style={{ marginLeft: 16 }}>
            <Tooltip title="?????????">
              <Popover
                content={
                  <Checkbox.Group
                    value={showColumnKeys}
                    onChange={(value): void => {
                      onColumnSettingsChange(
                        columnSettings.map(
                          (columnSetting): ColumnSettingType => ({
                            ...columnSetting,
                            hidden: value.indexOf(`${columnSetting.key}`) < 0,
                          })
                        )
                      );
                    }}
                  >
                    <DndProvider backend={Backend}>
                      {columnSettings.map(
                        (item, index): ReactElement => (
                          <DndCheckbox
                            index={index}
                            key={item.key}
                            value={item.key}
                            fixed={item?.fixed}
                            onConfigsChange={handleConfigsChange}
                          >
                            {
                              columns.find(
                                (column): boolean => column.key === item.key
                              )?.title
                            }
                          </DndCheckbox>
                        )
                      )}
                    </DndProvider>
                  </Checkbox.Group>
                }
                placement="bottomLeft"
                trigger="click"
              >
                <SettingOutlined spin={false} style={{ fontSize: 16 }} />
              </Popover>
            </Tooltip>
          </div>
        ) : null}
      </Option>
    </StyledToolBar>
  );
};
