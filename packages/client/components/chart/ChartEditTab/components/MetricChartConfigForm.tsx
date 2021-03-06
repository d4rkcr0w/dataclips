import { FC } from "react";
import {
  Select,
  Row,
  Col,
  Form,
  Space,
  InputNumber,
  Divider,
  Input,
  Tooltip,
} from "antd";
import { ComparisonOperator } from "../../../../types";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

export interface MetricChartEditConfig {
  compareCol: string[];
  valueCol: string[];
}

interface MetricChartConfigFormProps {
  editOptionConfig?: MetricChartEditConfig;
}

export const MetricChartConfigForm: FC<MetricChartConfigFormProps> = ({
  editOptionConfig,
}) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={["metricConfig", "valueCol"]}
            label="显示值"
          >
            <Select
              optionFilterProp="children"
              showSearch
              allowClear
              placeholder="选择显示值"
            >
              {editOptionConfig?.valueCol.map((value) => (
                <Option value={value} key={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={["metricConfig", "compareCol"]}
            label="对比值"
          >
            <Select
              optionFilterProp="children"
              showSearch
              allowClear
              placeholder="选择对比值"
            >
              {editOptionConfig?.compareCol.map((value) => (
                <Option value={value} key={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name={["metricConfig", "threshold", "condition"]}
            label="阈值条件"
          >
            <Select
              optionFilterProp="children"
              showSearch
              allowClear
              placeholder="选择阈值条件"
            >
              {[
                { label: "大于", value: ComparisonOperator.GREATER },
                { label: "小于", value: ComparisonOperator.LESS },
                { label: "等于", value: ComparisonOperator.EQUAL },
                { label: "不等于", value: ComparisonOperator.NOT_EQUAL },
                {
                  label: "大于等于",
                  value: ComparisonOperator.GREAT_THAN_OR_EQUAL,
                },
                {
                  label: "小于等于",
                  value: ComparisonOperator.LESS_THAN_OR_EQUAL,
                },
              ].map((item) => (
                <Option key={item.label} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item noStyle shouldUpdate>
            {({ setFieldsValue }) => {
              return (
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label="阈值类型"
                  name={["metricConfig", "threshold", "type"]}
                >
                  <Select
                    optionFilterProp="children"
                    showSearch
                    placeholder="选择阈值类型"
                    allowClear
                    onChange={() => {
                      setFieldsValue({
                        metricConfig: {
                          threshold: {
                            value: undefined,
                          },
                        },
                      });
                    }}
                  >
                    <Option value="number">数值</Option>
                    <Option value="percent">百分比</Option>
                  </Select>
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>

        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            const thresholdType = getFieldValue([
              "metricConfig",
              "threshold",
              "type",
            ]);

            if (!thresholdType) {
              return null;
            }

            return (
              <Col span={24}>
                {thresholdType === "number" ? (
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name={["metricConfig", "threshold", "value"]}
                    label="阈值"
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="输入数值"
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name={["metricConfig", "threshold", "value"]}
                    label="阈值"
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="输入百分比数值"
                      addonAfter="%"
                    />
                  </Form.Item>
                )}
              </Col>
            );
          }}
        </Form.Item>

        <Col span={24}>
          <Divider style={{ marginTop: 0 }} orientation="left">
            其他
          </Divider>
          <Form.Item
            rules={[
              {
                pattern:
                  /^((http|https):\/\/)(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/,
                message: "请输入完整的链接格式",
              },
            ]}
            name={["metricConfig", "link"]}
            style={{ marginBottom: 0 }}
            label={
              <Space>
                外跳链接
                <Tooltip title="在预览仪表盘时点击此卡片会触发链接跳转（如果填写了链接的话）">
                  <InfoCircleOutlined />
                </Tooltip>
              </Space>
            }
          >
            <Input placeholder="填写外跳链接"></Input>
          </Form.Item>
        </Col>
      </Row>
    </Space>
  );
};
