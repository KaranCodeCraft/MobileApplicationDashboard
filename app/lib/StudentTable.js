"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const StudentTable = ({ data }) => {

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1, 
        header: "S.no",
        size: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 15,
      },
      {
        accessorKey: "enrollmentNumber",
        header: "Enrollment Number",
        size: 15,
      },
      {
        accessorKey: "aadharNumber", // Mapping for Aadhar number
        header: "Aadhar Number",
        size: 15,
      },
      {
        accessorKey: "createdAt", // Mapping for registration date
        header: "Registration Date",
        size: 15,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(), // Format date as needed
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, // Data passed as prop
    initialState: {
      density: "compact",
      pagination: { pageIndex: 0, pageSize: 5 },
    },
    enableColumnOrdering: false,
    enableCellActions: false,
    // enablePagination: false,
  });

  return (
    <div>
      <MaterialReactTable
        table={table}
        muiTableProps={{
          sx: {
            "& .MuiToolbar-root": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          },
        }}
      />
    </div>
  );
};

export default StudentTable;