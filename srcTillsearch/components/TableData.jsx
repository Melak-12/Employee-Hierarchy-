import { Button, Pagination, Popover, Table, Text } from '@mantine/core';
import React, { useState } from 'react';
import {Data} from '../pages/TreeData'

const TableData = ({ treeData, treeData2,handleUpdate, handleDelete, setSelectedRecord }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const paginatedData = treeData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  if (treeData2) {
  treeData=treeData2
}
  const selectAndUpdate = (data) => {
    handleUpdate(data);
    setSelectedRecord(data);
  };

  return (
    <>
      <Table className='bg-slate-200 rounded-2xl'>
        <tbody>
          <tr className='bg-slate-700 rounded-2xl'>
            <td className='text-lg font-sans font-extrabold text-green-400'>Position</td>
            <td className='text-lg font-sans font-extrabold text-green-400'>Description</td>
            <td className='text-lg font-sans font-extrabold text-green-400'>Name</td>
            <td className='text-lg font-sans font-extrabold text-green-400'>Action</td>
          </tr>

          {treeData.map((element) => (
            <tr key={element.id} className='font-sans'>
              <td>{element.position}</td>
              <td>{element.description}</td>
              <td>{element.name}</td>
              <td>
                <Button
                  style={{ color: 'black', borderRadius: 9, borderColor: 'grey' }}
                  onClick={() => selectAndUpdate(element)}
                >
                  <i className='fas fa-pencil-alt'></i>
                </Button>

                <Popover width={200} position='bottom' withArrow shadow='md'>
                  <Popover.Target style={{ marginLeft: 8, color: 'red', borderColor: 'grey' }} className='rounded'>
                    <i className='fas fa-trash'></i>
                  </Popover.Target>
                  <Popover.Dropdown className='bg-slate-700 rouded-2xl font-sans text-slate-300'>
                    <Text size='sm' className='font-sans'>
                      Are you sure you want to delete this Employee?
                    </Text>
                    <Button className='mr-5 text-white'>No</Button>
                    <Button onClick={() => handleDelete(element.id)} className='border-red-600 text-red-500'>
                      Yes
                    </Button>
                  </Popover.Dropdown>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Component */}
      {/* <Pagination
        total={treeData.length}
        limit={itemsPerPage}
        currentPage={currentPage}
        onPaginate={handlePageChange}
      /> */}
    </>
  );
};

export default TableData;
