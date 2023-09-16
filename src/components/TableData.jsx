import { Button, Pagination, Popover, Switch, Table, Text } from '@mantine/core';
import React, { useState } from 'react';

const TableData = ({ treeData, treeData2, handleUpdate, handleDelete, setSelectedRecord ,parentPos}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [checked, setChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc'); // Track sorting direction
  const [sortColumn, setSortColumn] = useState('position'); // Track sorting column

  const itemsPerPage = 6;

  if (!checked && treeData2) {
    treeData = treeData2;
  }

  const selectAndUpdate = (data) => {
    setSelectedRecord(data);
    handleUpdate(data);
  };

  const filteredTreeData = treeData.filter((element) =>
      element.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    const valueA = a[sortColumn].toLowerCase();
    const valueB = b[sortColumn].toLowerCase();
    return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });

  const totalPages = Math.ceil(filteredTreeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTreeData.slice(startIndex, endIndex);
  const parentDetail = (dd) => {
    const pos = '';
    for (let i = 0; i < currentItems.length; i++){
      if (currentItems[i].id === dd) {
        pos=currentItems.position
      }
    }
    console.warn(currentItems[currentItems.length-1])
  }
  const handleSort = (column) => {
    setSortColumn(column);
    setSortDirection((prevSortDirection) => (prevSortDirection === 'asc' ? 'desc' : 'asc'));
  };


  return (
    <>
      <input
        type="text"
        placeholder="Search by Position, Description, or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-1/2  pl-3 mb-7  rounded-lg p-2 focus:border-custume-blue focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-600 font-sans"
      />
      <i className="fas fa-search text-slate-500 text-xl   -ml-11"></i>
      
     
      <Table className="bg-slate-200 rounded-2xl">
        <tbody>
          <tr className="bg-slate-800 rounded-sm">
            <td className="text-base font-sans font-extrabold text-green-400"><Button
                onClick={() => handleSort('position')}
                color="gray"
                variant="link"
                className="text-green-400  text-base font-sans hover:bg-slate-600"

              >
                Position
                {sortColumn === 'position' && (
                  <i className={`fas fa-caret-${sortDirection === 'asc' ? 'up' : 'down'} ml-1`}></i>
                )}
              </Button></td>
            <td><Button className='text-base font-sans font-bold text-green-400 hover:bg-slate-600'>Description</Button></td>
            <td><Button className='text-base font-sans font-bold text-green-400 hover:bg-slate-600'>Name</Button></td>
            <td><Button className='text-base font-sans font-bold text-green-400 hover:bg-slate-600'>Action</Button></td>&nbsp;

            <Switch
              className="-mt-2"
              color="green"
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              label={<span className="text-sm text-green-400 font-sans">All</span>}
            />
          </tr>
          {( !checked&&currentItems.length > 0 )&& (<>
           
          <tr
          className=" hover:text-green-700  font-sans bg-slate-400 pb-8 text-slate-700"
          style={{ fontWeight: '1000' }} 
          >
            <td>{currentItems[0].parentPosition.position}</td>
            <td>{currentItems[0].parentPosition.description}</td>
            <td>{currentItems[0].parentPosition.name}</td>
            <td>
                <Button
                  onClick={() => selectAndUpdate(currentItems[0].parentPosition)}
                  className=" font-bold bg-slate-600 text-white hover:bg-slate-500 hover:text-white border-3"
                >
                  <i className="fas fa-pencil-alt"></i>
                </Button>

                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target style={{ marginLeft: 8 }}>
                  <Button
                      className="font-bold  bg-red-500 text-white hover:bg-red-500 hover:text-white border-3"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown className="bg-slate-700 font-sans text-slate-300" style={{ borderRadius: 10 }}>
                    <Text size="sm" className="font-sans">
                      Are you sure you want to delete this Employee?
                    </Text>
                    <Button
                      onClick={() => handleDelete(currentItems[0].parentPosition.id)}
                      className="border-red-400 text-red-400 hover:bg-red-500 hover:text-white text-lg mt-2"
                    >
                      Yes
                    </Button>
                  </Popover.Dropdown>
                </Popover>
              </td>
            <td><b>Parent</b></td>
            

          </tr>
          </>)}
          {currentItems.map((element,index) => (<>
            <tr
              key={element.id}
              className={`font-sans p-3 hover:text-green-600 ${index%2===1?'bg-slate-400  hover:text-green-800  text-slate-800':'bg-slate-500 text-slate-200 hover:text-green-900 '}`}
            >
                
              <td onClick={()=>parentDetail(element.parentId)}>{element.position}</td>
              <td>{element.description}</td>
              <td>{element.name}</td>
              
              <td>
                <Button
                  onClick={() => selectAndUpdate(element)}
                  className="text-white font-bold bg-slate-600  hover:bg-slate-400 hover:text-white border-3"
                >
                  <i className="fas fa-pencil-alt"></i>
                </Button>

                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target style={{ marginLeft: 8 }}>
                    <Button
                      className="font-bold  bg-red-500 text-white hover:bg-red-400 hover:text-white border-3"
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
              {!checked?<td>child</td>:<td></td>}

            </tr>
          </>))}

          {totalPages > 1 && (
            <tr>
              <td colSpan={4} className="text-center">
                <Pagination
                  size="md"
                  total={totalPages}
                  value={currentPage}
                  onChange={(newPage) => setCurrentPage(newPage)}
                  // radius={4}
                  color='green'
                  align='center'
                  style={{backgroundColor:"black",color:"white"}}
                  radius="md"
                  className="bg-gradient-to-br w-100 p-1 pr-72 from-green-200 via-purple-300 to-green-200 dark:bg-gradient-to-br dark:from-slate-500 dark:via-gray-500 dark:to-slate-500 rounded-lg"
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
