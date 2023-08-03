import React, { useEffect, useState } from 'react';
import firebase from '../config/FirebaseConfig';
import {Modal, Form, Input, Select, message ,Table} from 'antd';
import AddEmp from '../pages/AddEmp';
import Spinner from '../components/Spinner';
import { useForm } from 'react-hook-form';
import '../style/custumStyle.css';
import TableData from '../components/TableData';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee,updateEmployee,deleteEmployee } from '../reducer/treeSlice';
import { fetchTreeData } from '../reducer/treeAsyncThunk';
import { Alert, Notification } from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import UpdateForm from '../components/UpdateForm';

const DataFromFirebase = ({ treeData2 }) => {
  const dispatch = useDispatch();
  const treeData = useSelector((state) => state.treeD.empData)
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlertMsg,setShowAlertMsg]=useState('')

  useEffect(() => {
    dispatch(fetchTreeData())
  }, [dispatch]);
  
  const openModal = () => {
    setIsModal2Visible((prev) => !prev);
  };

 
  const handleUpdate = (record) => {
    console.log('the updated data '+record.parentId)
    // setSelectedRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      id: record.id,
      position: record.position || '',
      description: record.description,
      parentId: record.parentId || '',
      name: record.name,
    });
  };

  const handleModalCancel = () => {
    setIsModal2Visible(false);
    setIsModalVisible(false);
    form.resetFields();
  };

  const deleteEmployeePosition = async (id) => {
    setShowSpinner(true);
    const hasChildren = treeData.some((position) => position.parentId === id);
    if (hasChildren) {
      alert('Delete the child positions first!');
    } else {
      try {
        await firebase.database().ref('tree').child(id).remove()
          .then(() => {
         setShowAlertMsg("Employee position Deleted Successfully !")
          setTimeout(() => {
            setShowSpinner(false);
          }, 2000);         
        });
        // setTreeData((prevTreeData) => prevTreeData.filter((position) => position.id !== id));
        setIsModalVisible(false);
        form.resetFields();
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
      // await axios.post('https://employee-stracture-default-rtdb.firebaseio.com/tree.json', positionWithId);
      dispatch(addEmployee(positionWithId))
      setIsModal2Visible(false);
      setIsModalVisible(false);
      form.resetFields();
      setTimeout(() => {
        setShowAlertMsg('');
      }, 4000);
    } catch (error) {
      alert('Error adding new employee position:', error);
    }
  };

  const handleUpdateCancel = () => {
    setIsModal2Visible(false);
    setIsModalVisible(false);
    form.resetFields();
    setSelectedRecord(null); // Reset the selectedRecord state to null
  };
  

  const updateEmployeePosition = async (id, updatedPosition) => {
    // setShowSpinner(true);
  try {
    const updatedData = { ...updatedPosition };
    await firebase.database().ref('tree').child(id).set(updatedData).then(() => {
      setShowAlertMsg("Employee Position updated Successfully !")
      setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
    });
    handleUpdateCancel();
    // setTreeData((prevTreeData) => prevTreeData.map((position) => (position.id === id ? updatedPosition : position)));
    dispatch(updateEmployee(updatedData))
    setTimeout(() => {
      setShowAlertMsg('');
    }, 4000);
  } catch (error) {
    alert('Error updating employee position:', error);
  }
  };
  
  const handleUpdateSubmit = () => {
    form.validateFields().then((values) => {
      if (!selectedRecord) {
        // Handle the case where selectedRecord is null (optional)
        message.error('No record selected for update.');
        setIsModalVisible(false);
        form.resetFields();
        return;
      }
  
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
    });
  };
  

 const positions = (data) => {
    let options = [];
    const addOptions = (data) => {
      data.forEach((p) => {
        options.push(
          <Select.Option key={p.id} value={p.id}>
            {p.position}
          </Select.Option>
        );

        if (p.children) {
          addOptions(p.children);
        }
      });
    };
    if (data) {
      addOptions(data);
    }
    return options;
 };
  
  
  return (
    <div> 
      {showAlertMsg&&<Alert className='w-72 -mt-36'  icon={<IconAlertCircle size="3rem" />} title="Notice!" color="green" radius="lg" variant="filled">
      {showAlertMsg }
    </Alert>}
      {/* //^  Componesdnt
      */}<TableData treeData={treeData} treeData2={treeData2}  handleUpdate={handleUpdate} handleDelete={deleteEmployeePosition} setSelectedRecord={(newd)=>setSelectedRecord(newd) } />
     
      <div>
        <Modal
          okButtonProps={{ style: { display: 'none' } }}
          visible={isModal2Visible}
          centered
          onCancel={handleModalCancel}
          title={
            <span className="flex justify-center text-green-100 bg-slate-500 rounded-lg p-3 font-sans">
              Add Employee
            </span>
          }
        >
        {/* //^  Componesdnt
      */}<AddEmp handlForm={addEmployeePosition} treeData={treeData}/>
        </Modal>
      </div>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-green-100 border-spacing-3 shadow py-3 px-6 font-semibold text-md rounded"
        onClick={openModal}
      >
        Add Employee Position
      </button>
       
        
        <Modal
        title={
          <span className="flex justify-center text-green-100 bg-slate-500 rounded-lg p-3 font-sans">
            Update Employee Position
          </span>
        }
        visible={isModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={handleUpdateCancel}
        okButtonProps={{ style: { color: 'white', backgroundColor: '#00cc00' } }}>
          {/* <UpdateForm treeData={treeData} selectedRecord={selectedRecord} handleUpdateForm={ handleUpdateSubmit} />   */}
          <Form form={form} layout="vertical" className='p-10'>
            
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: 'Please enter your Position!' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter an Employee name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a Description!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="parentId" label="Parent Position">
              <Select>
                {positions(treeData)}
              </Select>
            </Form.Item>
          </Form>
      </Modal>
      {showSpinner && <Spinner />}
    </div>
  );
};

export default DataFromFirebase;
