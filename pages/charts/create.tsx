import {
  Stack,
  FormControl,
  Input,
  FormErrorMessage,
  Select,
  Button,
  useToast,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useUpdateEffect } from "react-use";
import { useCallback } from "react";
import { ChartEditTab } from "../../components/ChartEditTab";
import { ChartResultPreview } from "../../components/ChartResultPreview";
import ProjectLayout from "../../layouts/ProjectLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FunnelChartConfig } from "../../components/ChartResultPreview/components/FunnelChart";
import { MetricChartConfig } from "../../components/ChartResultPreview/components/MetricChart";
import { ChartType } from "../../types";
import { Loading } from "../../components/Loading";
import {
  CreateChartInput,
  useClipConnectionQuery,
  useCreateChartMutation,
} from "../../generated/graphql";
import { useQueryResult } from "../../hooks/useQueryResult";
import { useRouter } from "next/router";

const ChartCreate = () => {
  const router = useRouter();
  const toast = useToast();

  const { data: clipsData } = useClipConnectionQuery({
    variables: { first: 100 },
  });

  const [createChart, { loading: createChartLoading }] =
    useCreateChartMutation();

  const form = useFormik({
    initialValues: {
      name: "",
      type: "" as ChartType,
      clipId: "",
      funnelConfig: { groupCol: "", valueCol: "" },
      metricConfig: { valueCol: "", compareCol: "" },
    },
    isInitialValid: false,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async () => {
      const input = {
        name: form.values.name,
        type: form.values.type,
        config:
          form.values.type === ChartType.FUNNEL
            ? form.values.funnelConfig
            : form.values.metricConfig,
        clipId: form.values.clipId,
      } as CreateChartInput;

      try {
        const result = await createChart({
          variables: {
            input,
          },
        });
        toast({
          description: "创建成功",
          status: "success",
          isClosable: true,
        });
        if (result.data?.createChart.id) {
          router.push(`/charts/${result.data?.createChart.id}/edit`);
        }
      } catch (err) {
        console.log("err", err);
      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      clipId: Yup.string().required(),
      type: Yup.string().required(),
    }),
  });

  const { data: result, isLoading } = useQueryResult(form.values.clipId);

  const getChartTypePreviewConfig = useCallback(() => {
    if (form.values.type === ChartType.FUNNEL) {
      return {
        groupCol: form.values.funnelConfig.groupCol || "",
        valueCol: form.values.funnelConfig.valueCol || "",
      } as FunnelChartConfig;
    }

    if (form.values.type === ChartType.METRIC) {
      return {
        valueCol: form.values.metricConfig.valueCol || "",
        compareCol: form.values.metricConfig.compareCol || "",
      } as MetricChartConfig;
    }

    return undefined;
  }, [form]);

  // 初始配置
  useUpdateEffect(() => {
    if (!form.values.clipId) {
      form.setValues(form.initialValues);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <Stack pb={4} spacing={3} direction="row">
          <FormControl width="30%" isInvalid={!!form.errors.name}>
            <Input
              size="sm"
              borderRadius="md"
              placeholder="请输入图表名称"
              {...form.getFieldProps("name")}
              onChange={form.handleChange}
              value={form.values.name}
            />
            <FormErrorMessage>请输入图表名字</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!form.errors.clipId}>
            <Select
              size="sm"
              borderRadius="md"
              flex="1"
              {...form.getFieldProps("clipId")}
              placeholder="请选择数据源"
              value={form.values.clipId}
              onChange={form.handleChange}
            >
              {clipsData?.clipConnection.edges?.map(
                ({ node: { id, name } }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                }
              )}
            </Select>
            <FormErrorMessage>请选择数据源</FormErrorMessage>
          </FormControl>

          <Button
            size="sm"
            type="submit"
            colorScheme="blue"
            isLoading={createChartLoading}
          >
            保存
          </Button>
        </Stack>
      </form>

      <Flex flexWrap="nowrap">
        <Box h="calc(100vh - 152px)" w="70%">
          {result && (
            <ChartResultPreview
              config={getChartTypePreviewConfig()}
              type={form.values.type}
              result={result}
            />
          )}
        </Box>

        <Box w="30%">
          <ChartEditTab form={form} result={result}></ChartEditTab>
        </Box>
      </Flex>
    </>
  );
};

ChartCreate.layout = ProjectLayout;

export default ChartCreate;