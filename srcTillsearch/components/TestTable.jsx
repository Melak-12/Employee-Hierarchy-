import React from 'react';
import { useTable, usePagination } from 'react-table';
import { MantineProvider, Container, Table, Button, Center } from '@mantine/core';

const TestTable = () => {
  // Sample data for the table
  const data = React.useMemo(
    () => [
      { name: 'John Doe', age: 28, city: 'New York' },
      { name: 'Jane Smith', age: 35, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 42, city: 'Chicago' },
      { name: 'Alice Williams', age: 30, city: 'San Francisco' },
      // Add more data here
    ],
    []
  );

  // Table columns
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'City', accessor: 'city' },
    ],
    []
  );

  // Use react-table with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Set initial page index
    },
    usePagination
  );

  return (
    <MantineProvider>
      <Container size="sm">
        <Table {...getTableProps()} style={{ marginBottom: 16 }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Center>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          {pageOptions.map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageIndex === pageNum ? 'filled' : 'outline'}
              onClick={() => nextPage(pageNum)}
              style={{ margin: '0 4px' }}
            >
              {pageNum + 1}
            </Button>
          ))}
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </Center>
      </Container>
    </MantineProvider>
  );
};

export default TestTable;
