import React, { useEffect, useState } from 'react';
import firebase from '../config/FirebaseConfig';
import AddEmp from '../pages/AddEmp';
import Spinner from '../components/Spinner';
import '../style/custumStyle.css';
import TableData from '../components/TableData';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee,updateEmployee,deleteEmployee } from '../reducer/treeSlice';
import { fetchTreeData } from '../reducer/treeAsyncThunk';
import {  Modal,Notification} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import UpdateForm from '../components/UpdateForm';

const DataFromFirebase = ({ treeData2 }) => {

  const dispatch = useDispatch();
  const treeData = useSelector((state) => state.treeD.empData)
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState('')
  

  useEffect(() => {
    dispatch(fetchTreeData())
  }, [dispatch]);
 
 
  const deleteEmployeePosition = async (id) => {
    const hasChildren = treeData.some((position) => position.parentId === id);
    if (hasChildren) {
        setShowAlertMsg('faild');
        setTimeout(() => {
         setShowAlertMsg('');
        }, 3000);
    } else {
      setShowSpinner(true);
      try {
        await firebase.database().ref('tree').child(id).remove()
          .then(() => {
         setShowAlertMsg("Employee position Deleted Successfully !")
          setTimeout(() => {
            setShowSpinner(false);
          }, 2000);         
        });
        setIsModalVisible(false);
        dispatch(deleteEmployee(id))
        setTimeout(() => {
          setShowAlertMsg('');
        }, 4000);

      } catch (error) {
        alert('Error deleting employee position:', error);
      }
    }
  };  
  
  
  const addEmployeePosition = async (positionData) => {
    setShowSpinner(true);
    try {
      const newId = firebase.database().ref().push().key;
      const positionWithId = { ...positionData, id: newId };
      await firebase.database().ref('tree').child(newId).set(positionWithId).then(() => {
        setShowAlertMsg("Employee position added Successfully !")
        setTimeout(() => {
          setShowSpinner(false);
        }, 2000);
      });
      dispatch(addEmployee(positionWithId))
      setIsModal2Visible(false);
      setTimeout(() => {
        setShowAlertMsg('');
      }, 4000);
    } catch (error) {
      alert('Error adding new employee position:', error);
    }
  };

  const updateEmployeePosition = async (id, updatedPosition) => {
    setShowSpinner(true);
    try {
      const updatedData = { ...updatedPosition };
      await firebase.database().ref('tree').child(id).set(updatedData).then(() => {
        setShowAlertMsg("Employee Position updated Successfully !")
        setTimeout(() => {
          setShowSpinner(false);
        }, 2000);
      });
      setIsModalVisible(false);
      dispatch(updateEmployee(updatedData))
      setTimeout(() => {
        setShowAlertMsg('');
      }, 4000);
      
    } catch (error) {
      alert('Error updating employee position:', error);
    }
  };
  
  const handleUpdateSubmit = (values) => {
      if (!selectedRecord) {
        console.error('No record selected for update.');
        setIsModalVisible(false);
        return;
      }
      else {
        const updatedRecord = {
        ...selectedRecord,
        position: values.position || '',
        name: values.name,
        description: values.description,
        parentId: values.parentId || '',
      };
  
      if (values.parentId !== '') {
        updatedRecord.parentId = values.parentId;
      }
  
      updateEmployeePosition(selectedRecord.id, updatedRecord);
      } 
  };
  

  return (
    <div> 
    
     
      {/* //&  COMPONENT
      */}<TableData treeData={treeData} treeData2={treeData2}  handleUpdate={()=>setIsModalVisible(true)} handleDelete={deleteEmployeePosition} setSelectedRecord={(newd)=>setSelectedRecord(newd) } />
      
      {showAlertMsg && showAlertMsg === 'faild' ?
      // <Notification/>
       
        <Notification className='w-72 mt-2 shadow-2xl ml-96 -mr-96 text-white' icon={<IconAlertCircle size="3rem" />} title="" color="red" radius="lg" variant="filled">
         {"Please Delete the child first !" }
        </Notification>
        : showAlertMsg && 
        
        <Notification className='w-72 shadow-2xl ml-96 -mr-96' icon={<IconAlertCircle size="3rem" />} title="" color="green" radius="lg" variant="filled">
        {showAlertMsg }
        </Notification> 
       }
      <div>
        <Modal
          opened={isModal2Visible}
          centered
          onClose={()=>setIsModal2Visible(false)}
          title={
            <span className=" flex  text-green-100 bg-slate-500 ml-20 max-w-full rounded-lg pl-11 p-3 pr-11 font-sans">
              Add Employee Position
            </span>
          }>
            
          {/* //&  COMPONENT
          */}<AddEmp handlForm={addEmployeePosition} treeData={treeData} />
        </Modal>
      </div>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-green-100 border-spacing-3 shadow py-3 px-6 font-semibold text-md rounded"
        onClick={()=>setIsModal2Visible((prev) => !prev)}> Add Employee Position
      </button>
               
     <Modal
        title={
          <span className=" flex  text-green-100 bg-slate-500 ml-20 max-w-full rounded-lg pr-7 pl-7 p-3 font-sans">
            Update Employee Position
          </span>
        }
        opened={isModalVisible&&selectedRecord}
        onClose={()=>setIsModalVisible(false)}>
        {/* //&  COMPONENT
          */}<UpdateForm treeData={treeData} selectedRecord={selectedRecord} handleUpdateForm={ handleUpdateSubmit} />  
      </Modal>
      {showSpinner && <Spinner />}
      
      
    </div>
  );
};

export default DataFromFirebase;
