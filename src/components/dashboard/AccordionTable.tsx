import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ReactNode, useMemo, useState } from "react";
import { Box, TablePagination, Typography } from "@mui/material";

interface AccordionTableRowProps {
  row: AccordionTableRow;
}

function AccordionTableRow({ row }: AccordionTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {Object.entries(row.data).map(([key, value], index) => (
          <TableCell component="th" scope="row" key={index}>
            {value}
          </TableCell>
        ))}
        <TableCell align="right" width="50" padding="checkbox" sx={{ pr: 1 }}>
          {!!row?.extraData ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
      </TableRow>
      {!!row?.extraData ? (
        <TableRow>
          <TableCell sx={{ p: 0 }} colSpan={Object.keys(row.data).length + 1}>
            <Collapse in={open} unmountOnExit>
              <DisplayExtraData row={row} />
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </React.Fragment>
  );
}

export const DisplayExtraData = ({
  row: { data, extraData },
}: AccordionTableRowProps) => {
  return (
    <Box sx={{ p: 2, display: "flex", gap: 2 }}>
      {Object.entries(extraData!).map(([key, value], index) => (
        <Typography key={index}>
          {key}: {value}
        </Typography>
      ))}
    </Box>
  );
};

export interface AccordionTableColumn {
  label: ReactNode;
  dataKey?: any;
  numeric?: boolean;
  width?: number;
}

export interface AccordionTableRow {
  data: { [key: string]: any };
  extraData?: { [key: string]: any };
}

export interface AccordionTableProps {
  columns: AccordionTableColumn[];
  rows: AccordionTableRow[];
  paginationOptions?: {
    enablePagination: boolean;
    pageRowCount: number;
    rowsPerPageOptions: number[];
  };
}

const initialRowsPerPageOptions = Array.from(
  { length: 6 },
  (_, i) => (i + 2) ** 2 + 1
);

const initialPageRowCount = initialRowsPerPageOptions[1];

export const AccordionTable = ({
  columns = [],
  rows = [],
  paginationOptions: { enablePagination, pageRowCount, rowsPerPageOptions } = {
    enablePagination: rows.length > initialPageRowCount,
    pageRowCount: initialPageRowCount,
    rowsPerPageOptions: initialRowsPerPageOptions,
  },
}: AccordionTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageRowCount);

  const visibleRows = useMemo(
    () =>
      enablePagination
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows,
    [rows, page, rowsPerPage, enablePagination]
  );

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "transparent", border: "solid 1px rgba(250, 250, 250, .25)", }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row, index) => (
            <AccordionTableRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
      {enablePagination ? (
        <TablePagination
          component="div"
          page={page}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_event, page) => setPage(page)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value))
          }
          rowsPerPageOptions={rowsPerPageOptions}
        />
      ) : null}
    </TableContainer>
  );
};
