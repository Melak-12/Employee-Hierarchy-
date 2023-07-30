import React, { useEffect, useState } from 'react';
import firebase from '../config/FirebaseConfig';
import { Tree,  Button, Popconfirm, Modal, Form, Input, Select, message ,Table} from 'antd';
import AddEmp from '../pages/AddEmp';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../style/custumStyle.css';
import TableData from '../components/TableData';

const DataFromFirebase = ({treeData2}) => {
  const [treeData, setTreeData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [showSpinner, setShowSpinner] = useState(false);

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
  }, []);
  
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
  selectedRecord&&console.warn("selected",selectedRecord.id)

  const handleModalCancel = () => {
    setIsModal2Visible(false);
    setIsModalVisible(false);
    form.resetFields();
  };

  const deleteEmployeePosition = async (id) => {
    const hasChildren = treeData.some((position) => position.parentId === id);
    if (hasChildren) {
      alert('Delete the child positions first!');
    } else {
      try {
        await firebase.database().ref('tree').child(id).remove();
        setTreeData((prevTreeData) => prevTreeData.filter((position) => position.id !== id));
        alert('Employee position deleted successfully!!!');
      } catch (error) {
        alert('Error deleting employee position:', error);
      }
    }
  };  
  
  
  const addEmployeePosition = async (positionData) => {
    try {
      const newId = firebase.database().ref().push().key;
      const positionWithId = { ...positionData, id: newId };
      await firebase.database().ref('tree').child(newId).set(positionWithId);
      // await axios.post('https://employee-stracture-default-rtdb.firebaseio.com/tree.json', positionWithId);
      alert('New employee position added successfully!!!');
    } catch (error) {
      alert('Error adding new employee position:', error);
    }
  };

 const handleUpdateCancel = () => {
    setIsModal2Visible(false);
    setIsModalVisible(false);
    form.resetFields();
};

const updateEmployeePosition = async (id, updatedPosition) => {
  try {
    const updatedData = { ...updatedPosition };
    // delete updatedData.id;
    await firebase.database().ref('tree').child(id).set(updatedData);
    setTreeData((prevTreeData) => prevTreeData.map((position) => (position.id === id ? updatedPosition : position)));
    alert('Employee position updated successfully!!!');
  } catch (error) {
    alert('Error updating employee position:', error);
  }
};

const handleUpdateSubmit = () => {
    // setShowSpinner(true);

    form.validateFields().then((values) => {
      const updatedRecord = {
        ...selectedRecord,
        // id: selectedRecord.id,
        position: values.position||'',
        name: values.name,
        description: values.description,
        parentId: values.parentId||'',
      };
      if (values.parentId !== '') {
        updatedRecord.parentId = values.parentId;
      }
      selectedRecord&&updateEmployeePosition(selectedRecord.id,updatedRecord);
      setIsModalVisible(false);
      form.resetFields();
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
      {/* //^  Componesdnt
      */}<TableData treeData={treeData} treeData2={treeData2}  handleUpdate={handleUpdate} handleDelete={deleteEmployeePosition} setSelectedRecord={(newd)=>setSelectedRecord(newd) } />
     
      <d  iv>
        <Modal
          okButtonProps={{ style: { display: 'none' } }}
          visible={isModal2Visible}
          onCancel={handleModalCancel}
          title={
            <span className="flex justify-center text-green-100 bg-slate-500 rounded-lg p-3 font-sans">
              Add Employee
            </span>
          }
          centered
        >
        {/* //^  Componesdnt
      */}<AddEmp handlForm={addEmployeePosition} treeData={treeData}/>
        </Modal>
      </d>
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
