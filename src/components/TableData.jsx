import { Button, Pagination, Popover, Switch, Table, Text } from '@mantine/core';
import React, { useState } from 'react';

const TableData = ({ treeData, treeData2, handleUpdate, handleDelete, setSelectedRecord }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checked, setChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (checked) {
    treeData = treeData;
  } else if (!checked && treeData2) {
    treeData = treeData2;
  }

  const selectAndUpdate = (data) => {
    setSelectedRecord(data);
    handleUpdate(data);
  };

  const filteredTreeData = treeData.filter(
    (element) =>
      element.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTreeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTreeData.slice(startIndex, endIndex);

  return (
    <>
      <input
        type="text"
        placeholder="Search by Position, Description, or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-72 pr-2 pl-3 mb-7 rounded-lg p-2 focus:border-custume-blue focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-600 font-sans"
      />
      <i className="fas fa-search text-slate-500 text-xl p-2 -mb-1"></i>

      <Switch
        className="mb-1 flex justify-end"
        color="green"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label={<span className="text-lg font-sans">All Data</span>}
      />
      <Table className="bg-slate-200 rounded-2xl">
        <tbody>
          <tr className="bg-slate-700 rounded-2xl">
            <td className="text-lg font-sans font-extrabold text-green-400">Position</td>
            <td className="text-lg font-sans font-extrabold text-green-400">Description</td>
            <td className="text-lg font-sans font-extrabold text-green-400">Name</td>
            <td className="text-lg font-sans font-extrabold text-green-400">Action</td>
          </tr>

          {currentItems.map((element) => (
            <tr
              key={element.id}
              className="font-sans hover:text-green-600"
              // onClick={() => alert('row Data')}
            >
              <td>{element.position}</td>
              <td>{element.description}</td>
              <td>{element.name}</td>
              <td>
                <Button
                  onClick={() => selectAndUpdate(element)}
                  className="text-slate-800 font-bold hover:bg-slate-400 hover:text-white border-3"
                >
                  <i className="fas fa-pencil-alt"></i>
                </Button>

                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target style={{ marginLeft: 8 }}>
                    <Button
                      className="font-bold text-red-600 hover:bg-red-400 hover:text-white border-3"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown className="bg-slate-700 font-sans text-slate-300" style={{ borderRadius: 10 }}>
                    <Text size="sm" className="font-sans">
                      Are you sure you want to delete this Employee?
                    </Text>
                    <Button
                      onClick={() => handleDelete(element.id)}
                      className="border-red-400 text-red-400 hover:bg-red-500 hover:text-white text-lg mt-2"
                    >
                      Yes
                    </Button>
                  </Popover.Dropdown>
                </Popover>
              </td>
            </tr>
          ))}

          {totalPages > 1 && (
            <tr>
              <td colSpan={4} className="text-center">
                <Pagination
                  size="md"
                  total={totalPages}
                  value={currentPage}
                  onChange={(newPage) => setCurrentPage(newPage)}
                  radius={4}
                  color='teal'
                />
              </td>
            </tr>
          )}

          {currentItems.length === 0 && (
            <tr>
              <td>
                <span className="ml-5 text-red-600 font-sans">
                  <i className="fas fa-file-excel text-5xl text-slate-400 m-12 mr-5 "></i>
                  <span className="mt-2 ml-10">There is no child Employee Position!</span>
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;
