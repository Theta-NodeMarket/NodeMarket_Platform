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
import { TablePagination } from "@mui/material";

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
          {row?.hasExtraData ? (
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
      <TableRow>
        {row?.hasExtraData ? (
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={Object.keys(row.data).length + 1}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <DisplayExtraData data={row.extraData} />
            </Collapse>
          </TableCell>
        ) : null}
      </TableRow>
    </React.Fragment>
  );
}

export interface DisplayExtraDataProps {
  data: AccordionTableRow["hasExtraData"];
}

// todo: get this working
export const DisplayExtraData = ({ data }: DisplayExtraDataProps) => {
  return <div>display some extra data in here</div>;
};

export interface AccordionTableColumn {
  label: ReactNode;
  dataKey?: any;
  numeric?: boolean;
  width?: number;
}

export interface AccordionTableRow {
  data: { [key: string]: any };
  // todo: fix this up
  hasExtraData?: boolean;
  extraData?: any;
}

export interface AccordionTableProps {
  columns: AccordionTableColumn[];
  rows: AccordionTableRow[];
  paginationOptions?: {
    enablePagination: boolean;
    initialRowsPerPage: number;
    rowsPerPageOptions: number[];
  };
}

export const AccordionTable = ({
  columns = [],
  rows = [],
  paginationOptions: {
    enablePagination,
    initialRowsPerPage,
    rowsPerPageOptions,
  } = {
    enablePagination: true,
    initialRowsPerPage: 10,
    rowsPerPageOptions: Array.from({ length: 6 }, (_, i) => (i + 2) ** 2 + 1),
  },
}: AccordionTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const visibleRows = useMemo(
    () =>
      enablePagination
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows,
    [rows, page, rowsPerPage, enablePagination]
  );

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "transparent" }}>
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
