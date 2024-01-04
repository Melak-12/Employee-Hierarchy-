import React, { useState } from 'react';
import '../style/tree.css';
import axios from 'axios';
import { Box, Accordion } from '@mantine/core';
import { useSelector } from 'react-redux';



const TreeData = ({ treeDa, setTreeData2 }) => {
  const treeData2 = [
    {
      id: "0",
      position: "CEO",
      name: "melak",
      parentId: "",
      description: "Chief Executive Officer",
    },
    {
      id: "1",
      position: "CTO",
      name: "meba",
      parentId: "0",
      description: "Chief Technology Officer",
    },
    {
      id: "2",
      position: "PM",
      name: "mule",
      parentId: "1",
      description: "Project Manager",
    },
    {
      id: "3",
      position: "PO",
      name: "mel",
      parentId: "2",
      description: "Product Owner",
    },
    {
      id: "4",
      position: "TechLead",
      name: "angel",
      parentId: "3",
      description: "Tech Lead",
    },
    {
      id: "5",
      position: "frontDev",
      name: "angel",
      parentId: "4",
      description: "Front-end Developer",
    },
    {
      id: "6",
      position: "backDev",
      name: "angel",
      parentId: "4",
      description: "Back-end Developer",
    },
    {
      id: "7",
      position: "devOPS Engineer",
      name: "angel",
      parentId: "4",
      description: "DevOps Engineer",
    },
    {
      id: "8",
      position: "QA Engineer",
      name: "angel",
      parentId: "2",
      description: "Quality Assurance Engineer",
    },
    {
      id: "9",
      position: "Scrum Master",
      name: "angel",
      parentId: "2",
      description: "Scrum Master",
    },
    {
      id: "10",
      position: "CFO",
      name: "angel",
      parentId: "0",
      description: "Chief Financial Officer",
    },
    {
      id: "11",
      position: "Chif Accountant",
      name: "angel",
      parentId: "10",
      description: "Chief Accountant",
    },
    {
      id: "12",
      position: "financial Analyst",
      name: "angel",
      parentId: "11",
      description: "Financial Analyst",
    },
    {
      id: "13",
      position: "accountant & payable",
      name: "angel",
      parentId: "11",
      description: "Accountant & Payable",
    },
    {
      id: "14",
      position: "IA",
      name: "angel",
      parentId: "10",
      description: "Internal Auditor",
    },
    {
      id: "15",
      position: "COO",
      name: "angel",
      parentId: "0",
      description: "Chief Operating Officer",
    },
    {
      id: "16",
      position: "Product Manager",
      name: "angel",
      parentId: "15",
      description: "Product Manager",
    },
    {
      id: "17",
      position: "Operation manager",
      name: "angel",
      parentId: "15",
      description: "Operation Manager",
    },
    {
      id: "18",
      position: "Custum Manager",
      name: "angel",
      parentId: "15",
      description: "Customer Manager",
    },
    {
      id: "19",
      position: "HR",
      name: "angel",
      parentId: "0",
      description: "Human Resources",
    },
    {
      id: "20",
      position: "child",
      name: "angel",
      parentId: "19",
      description: "Child Position",
    },
    {
      id: "-NaNkq8bOK-uGHQcltWX",
      position: "rr",
      name: "r",
      parentId: "0",
      description: "r",
    }
  ];

  const treeData=useSelector(((state)=>state.treeD.empData))

  const handleAddPosition = async () => {
    try {
      await axios.put('https://employee-stracture-default-rtdb.firebaseio.com/tree.json', treeData);
      alert('Data uploaded successfully!!!');
    } catch (error) {
      alert('Error uploading data:', error);
    }
  };
  //fs
  const renderPosition = (positionData) => {
    // const children = treeData.filter((item) => positionData.id === item.parentId);
    // const parentPosition = positionData.position;


    const children = treeData.filter((item) => positionData.id === item.parentId).map(child => ({
      ...child,
      parentPosition: positionData
    }));
    return (
      <>  
       <div className="cool-accordion">
  <Accordion className=''>
    <Accordion.Item value="customization">
      <Accordion.Control styles={{ icon: null }}
        onClick={() => setTreeData2(children)}
        className={`tree text-2xl bg-slate-400 rounded-2xl mt-3 text-slate-800 font-sans hover:bg-slate-600 hover:text-green-500 ${children.length === 0 ? 'hide-accordion-icon' : ''}`}
      >
        {positionData.position}
      </Accordion.Control>
      <Accordion.Panel className=''>
        {children.map((child) => renderPosition(child))}
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
</div>

          
        </>
    );
  };

  return (
    <>
      <div className='tree-container' style={{ borderRadius: 9 }}>
        <Box maw={400} mx="auto" className='mt-4 text-green-600'>
         
          {
            treeDa.map((item) => {
            if (item.parentId === ''||item.parentId===null) {
            
              return renderPosition(item);
            }
            return null;
          })}

        </Box>
        
        <button
        className="mt-52 mb-12 bg-green-500 hover:bg-green-600 text-green-100 border-spacing-3 shadow py-3 px-6 font-semibold text-md rounded"
        // onClick={handleAddPosition}
      >
          Upload the Data
      </button>
      </div>
    </>
  );
};

export default TreeData;

