import React, { useEffect, useState } from 'react'
import { Grid } from '@mantine/core'
import TreeData from '../pages/TreeData';
import '../style/custumStyle.css'
import DataFromFirebase from '../model/DataFromFirebase';
import '../style/headerText.css'
import Footer from './Footer';
import NavBar from './NavBar';
import AddEmp from './AddEmp'
import axios from 'axios';

const EmpStracture = () => {
  const [treeData, setTreeData] = useState([])
  const [treeData2,setTreeData2]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://employee-stracture-default-rtdb.firebaseio.com/tree.json');
        const data = response.data;
        const positions = data ? Object.values(data) : [];
        setTreeData(positions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [treeData]);
  return (
    <>
      <div className="bg-slate-300">

      <NavBar />
      <div className="flex flex-col min-h-screen -z-20 mt-36">
        <div className="flex flex-grow">
          <div className="w-1/3 max-h-fit bg-slate-200 rounded-tr-3xl">
            <button className="mt-8 w-full bg-slate-500 text-green-100 border-slate-600 shadow py-3 px-6 font-bold text-md rounded text-gradient  bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 bg-clip-text text-transparent animate-gradient">
              Hierarchy of Employee Positions
            </button>
            <div className="flex justify-center">
                <TreeData treeD={treeData}  setTreeData2={(e)=>setTreeData2(e)}/>
            </div>
          </div>
          <div className="w-2/3 bg-slate-300 text-center p-7 rounded-tl-sm">
            <span className="text-gradient font-bold bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 bg-clip-text text-transparent animate-gradient">
              Manage all the data of employees that includes names, roles, and other info
            </span>
              <br /><br /><br />
              
              <DataFromFirebase treeData2={treeData2} />
              {/* <AddEmp/> */}
          </div>
        </div>
        <Footer className="mt-auto" />
        </div>
      </div>
        
    </>
  )
}

export default EmpStracture
