import React from "react";
import data from "../data/users.json";
import { useTable, useRowSelect } from "react-table";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef: any = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function Users() {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 100,
      maxWidth: 600,
    }),
    []
  );

  const columns: any = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
        width: 30,
        align: 'center',
      },
      {
        Header: "First Name",
        accessor: "first_name",
        width: 200,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        width: 300,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 500,
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "IP Address",
        accessor: "ip_address",
        width: 200,
  
      },
    ],
    []
  );
  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          disableResizing: true,
          minWidth: 30,
          width: 30,
          maxWidth: 30,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }: any) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div
      style={{ height: "calc(100vh - 64px)", overflow: "auto", width: "100%" }}
    >
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 1px lightgrey",
                        background: "white",
                        color: "black",
                        fontWeight: "bold",
                        height: "30px",
                        width: column.width,
                      }}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{ textAlign: "start" }}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
