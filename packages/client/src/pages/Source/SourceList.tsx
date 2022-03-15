import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column, TableOptions } from "react-table";
import * as Yup from "yup";

import { Table } from "../../components/Table";
import {
  DatabaseSource,
  DatabaseType,
  useSourceConnectionQuery,
  useSourceLazyQuery,
  useUpdateDatabaseSourceMutation,
} from "../../generated/graphql";
import { useDeleteSourceMutation } from "../../hooks/useDeleteSourceMutation";
import { Page } from "../../layouts/components";
import { DataSourceForm } from "./components/DataSourceForm";

export const SourceList: FC = () => {
  let navigate = useNavigate();
  const toast = useToast();

  const { data } = useSourceConnectionQuery({
    variables: { first: 100 },
  });
  const [getSource, { data: sourceData, loading: sourceLoading }] =
    useSourceLazyQuery();
  const [deleteSource, { loading: deleteSourceLoading }] =
    useDeleteSourceMutation();
  const [updateDatabaseSource, { loading: updateDatabaseSourceLoading }] =
    useUpdateDatabaseSourceMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [selectedSourceId, setSelectedSourceId] = useState<string>("");

  const form = useFormik({
    initialValues: {
      dataSource: {
        name: "",
        host: "",
        port: undefined as undefined | number,
        database: "",
        username: "",
        password: "",
        type: "" as DatabaseType,
      },
    },
    isInitialValid: false,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      try {
        await updateDatabaseSource({
          variables: {
            id: selectedSourceId,
            input: {
              ...(values.dataSource as any),
            },
          },
        });

        onEditClose();
        setSelectedSourceId("");
        form.setValues(form.initialValues);

        toast({
          description: "更新成功",
          status: "success",
          isClosable: true,
        });
      } catch (err) {
        console.log("err", err);
      }
    },
    validationSchema: Yup.object().shape({
      dataSource: Yup.object({
        name: Yup.string().required(),
        host: Yup.string().required(),
        port: Yup.number().required(),
        database: Yup.string().required(),
        username: Yup.string().required(),
        password: Yup.string().required(),
        type: Yup.string().required(),
      }),
    }),
  });

  const handleDeleteSource = useCallback(async () => {
    try {
      if (selectedSourceId) {
        await deleteSource({ variables: { id: selectedSourceId } });

        toast({
          description: "删除成功",
          status: "success",
          isClosable: true,
        });

        setSelectedSourceId("");
        onClose();
      }
    } catch (err) {
      console.log("err", err);
    }
  }, [deleteSource, onClose, selectedSourceId, toast]);

  const tableProps = useMemo<TableOptions<any>>(() => {
    const columns: Column<any>[] = [
      {
        Header: "id",
        accessor: "id",
        Cell: ({
          row: {
            values: { id },
          },
        }) => {
          return (
            <Link
              onClick={async () => {
                onEditOpen();
                setSelectedSourceId(id);

                try {
                  const result = await getSource({ variables: { id } });

                  if (result.data) {
                    form.setValues({
                      dataSource: {
                        name: (result.data.source as DatabaseSource).name,
                        host: (result.data.source as DatabaseSource).host,
                        port: (result.data.source as DatabaseSource).port!,
                        database: (result.data.source as DatabaseSource)
                          .database!,
                        username: (result.data.source as DatabaseSource)
                          .username,
                        password: "",
                        type: (result.data.source as DatabaseSource).type,
                      },
                    });
                  }
                } catch (err) {
                  console.log("err", err);
                }
              }}
              color="blue.500"
            >
              {id}
            </Link>
          );
        },
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "operation",
        accessor: "operation",
        Cell: ({
          row: {
            values: { id },
          },
        }) => {
          return (
            <Link
              onClick={() => {
                setSelectedSourceId(id);
                onOpen();
              }}
              color="red.500"
            >
              删除
            </Link>
          );
        },
      },
    ];

    columns.push();

    const options: TableOptions<any> = {
      columns,
      data: data?.sourceConnection.edges?.map((item) => item.node) || [],
    };

    return options;
  }, [data?.sourceConnection.edges, navigate, onOpen]);

  return (
    <Page
      primaryAction={{
        text: "创建数据源",
        onClick: () => {
          navigate("/sources/create");
        },
      }}
    >
      {tableProps.data.length ? (
        <Table {...tableProps}></Table>
      ) : (
        <Flex h="calc(100vh - 104px)" align="center" justify="center">
          暂无数据
        </Flex>
      )}

      {/* 编辑 modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          onEditClose();
          setSelectedSourceId("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>编辑数据源</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={form.handleSubmit}>
            <ModalBody>
              <VStack spacing={4} pt={4}>
                {!sourceLoading && sourceData ? (
                  <DataSourceForm form={form}></DataSourceForm>
                ) : (
                  "请稍后"
                )}
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  onEditClose();
                  setSelectedSourceId("");
                }}
              >
                取消
              </Button>
              <Button
                colorScheme="red"
                type="submit"
                isLoading={updateDatabaseSourceLoading || sourceLoading}
              >
                确定
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* 删除 modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedSourceId("");
          form.setValues(form.initialValues);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>删除数据源</ModalHeader>
          <ModalCloseButton />
          <ModalBody>确定删除 id 为 {selectedSourceId} 的数据源？</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setSelectedSourceId("");
                form.setValues(form.initialValues);
              }}
            >
              取消
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteSource}
              isLoading={deleteSourceLoading}
            >
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  );
};
