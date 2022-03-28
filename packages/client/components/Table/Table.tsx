import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Flex,
  Table as BaseTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { TableOptions, useSortBy, useTable } from "react-table";

import { ResultFragment } from "../../generated/graphql";

export interface ResultPreviewProps {
  token?: string;
  result: ResultFragment;
}

export interface TableProps<T extends object = {}>
  extends TableOptions<T>,
    BoxProps {}

export const Table = (props: TableProps) => {
  const headerBackgroundColor = useColorModeValue("gray.50", "gray.800");

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(props, useSortBy);

  return (
    <Box overflowY="scroll" {...props}>
      <BaseTable
        sx={{ borderCollapse: "separate", borderSpacing: 0 }}
        {...getTableProps()}
      >
        <Thead position="sticky" top={0}>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  key={index}
                  whiteSpace="nowrap"
                  backgroundColor={headerBackgroundColor}
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex alignItems="center">
                    {column.render("Header")}
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <Td
                      key={index}
                      whiteSpace="nowrap"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </BaseTable>
    </Box>
  );
};