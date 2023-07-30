import React, { useEffect, useState } from 'react';
import firebase from '../config/FirebaseConfig';
import { Tree, Table, Button, Popconfirm, Modal, Form, Input, Select, message } from 'antd';
import AddEmp from '../pages/AddEmp';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../style/custumStyle.css';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import TableData from '../pages/TableData';

const DataFromFirebase = () => {

  const [treeData, setTreeData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const [showSpinner, setShowSpinner] = useState(false);

  const openModal = () => {
    setIsModal2Visible((prev) => !prev);
  };

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      id: record.id,
      title: record.title || '',
      name: record.name,
      disc: record.disc,
      parentId: record.parentId || '',
    });
  };

  const handleUpdateSubmit = () => {
    setShowSpinner(true);

    form.validateFields().then((values) => {
      const updatedRecord = {
        ...selectedRecord,
        id: values.id,
        title: values.title,
        name: values.name,
        disc: values.disc,
        parentId: values.parentId,
      };

      if (values.parentId !== '') {
        updatedRecord.parentId = values.parentId;
      }

      const updatedTreeData = updateRecord(treeData, updatedRecord);

      const treeRef = firebase.database().ref('tree');
      treeRef.set(updatedTreeData)
        .then(() => {
          setTimeout(() => {
            setShowSpinner(false);
          }, 2000);
          message.success({
            content: (<span className='text-green-700 border-2 rounded-lg border-green-500 font-sans p-2 pl-5 pr-7 mr-4 font-bold text-2xl'> Updated Successfully!</span>),
            style: {
              marginTop: '40vh',  borderColor:"green",borderRadius:"10px",color:"red"
            },
          });
                    
        })
        .catch((error) => {
          console.error('error updating record:', error);
        });

      setTreeData(updatedTreeData);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleUpdateCancel = () => {
    setIsModal2Visible(false);
    setIsModalVisible(false);
    form.resetFields();
  };

  const updateRecord = (nodes, updatedRecord) => {
    return nodes.map((node) => {
      if (node.id === updatedRecord.id) {
        return updatedRecord;
      } else if (node.id === updatedRecord.parentId) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(updatedRecord);
      } else if (node.children) {
        return {
          ...node,
          children: updateRecord(node.children, updatedRecord),
        };
      }
      return node;
    });
  };

  const handleDelete = (record) => {
    setShowSpinner(true);

    const updatedTreeData = deleteRecordAndChildren(treeData, record.id);
    const treeRef = firebase.database().ref('tree');
    treeRef
      .set(updatedTreeData)
      .then(() => {
        setTimeout(() => {
          setShowSpinner(false);
        }, 2000);
        // alert('Employee deleted successfully.');
        setIsModalVisible(false);
       
      })
      .catch((error) => {
        alert('Error deleting employee:', error);
        setShowSpinner(false);
      });
    setTreeData(updatedTreeData);
  };

  const deleteRecordAndChildren = (nodes, keyToDelete) => {
    return nodes.filter((node) => {

      if (node.id === keyToDelete) {
        if (!node.children) {
          message.success({
            content: (<span className='text-green-700 border-2 rounded-lg border-green-500 font-sans p-2 pl-5 pr-7 mr-4 font-bold text-2xl'>Employee deleted successfully.!</span>),
            style: {
              marginTop: '40vh',  borderColor:"green",borderRadius:"4px"
            },
            
          });
          return false; // exclude the node to delete
        }
        else return message.error('Please delete the cild first !')
      } else if (node.children) {
        node.children = deleteRecordAndChildren(node.children, keyToDelete);
        return true; // keep the node with updated children
      } else {
        return true; // keep the node without children
      }
    });
  };

  const handlForm = (parentIds, child) => {
    const parentId = parentIds;
    const newChild = child;

    setShowSpinner(true);
    const updatedTreeData = addNode(treeData, parentId, newChild);

    const treeRef = firebase.database().ref('tree');
    treeRef
      .set(updatedTreeData)
      .then(() => {
        setTimeout(() => {
          setShowSpinner(false);
        }, 2000);
        // alert('child added successfully.');
        setIsModalVisible(false);
        setIsModal2Visible(false)
        message.success({
          content: (<span className='text-green-700 border-2 rounded-lg border-green-500 font-sans p-2 pl-5 pr-7 mr-4 font-bold text-2xl'>child added successfully!</span>),
          style: {
            marginTop: '40vh',  borderColor:"green",borderRadius:"4px"
          },
          
        });
      })
      .catch((error) => {
        alert('Error adding child:', error);
        setShowSpinner(false);
      });

    setTreeData(updatedTreeData);
  };

  const addNode = (nodes, parentId, newChild) => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        if (!node.children) {
          node.children = []; //? initialize children array if it doesn't exist
        }
        node.children = [...node.children, newChild]; // it adds the new child to the parent's children
      } else if (node.children) {
        node.children = addNode(node.children, parentId, newChild);
      }
      return node;
    });
  };

  const columns = [
    {
      title: <span className="font-sans text-slate-300 text-lg">ID</span>,
      key: 'id',
      // dataIndex: 'id',
    },
    {
      title: <span className="font-sans font-bold text-slate-300 text-lg">Position</span>,
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: <span className="font-sans text-slate-300 text-lg">Description</span>,
      key: 'disc',
      dataIndex: 'disc',
    },
    {
      title: <span className="font-sans text-slate-300 text-lg">Name</span>,
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: <span className="font-sans text-slate-300 text-lg">Actions</span>,
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button style={{ color: 'black',borderRadius:9,borderColor:"grey" }} onClick={() => handleUpdate(record)}>
            <i className="fas fa-pencil-alt"></i>
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Employee?"
            onConfirm={() => handleDelete(record)}
            okText={<span style={{ color: 'red', }}>Yes</span>}
            cancelText="No"
          >
            <Button style={{ marginLeft: 8, color: 'red' ,borderColor:"grey"}}>
              <i className="fas fa-trash"></i>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://employee-stracture-default-rtdb.firebaseio.com/tree.json'
        );

        if (response.data) {
          const formattedData = Object.keys(response.data).map((key) => ({
            key,
            ...response.data[key],
          }));
          setTreeData(formattedData);
        }
      } catch (error) {
        console.error('error fetching tree data:', error);
      }
    };

    fetchData();
  }, []);

  const tableStyles = {
    // backgroundColor: 'red', 
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={treeData}
        style={tableStyles}
        rowKey="id"
        className="tables custom-table"
        pagination={{ pageSize: 5 }}
        rowClassName={() => 'custom-row'}

      />
      {/* <TableData columns={columns} dataSource={treeData} style={tableStyles} /> */}
      <div>
        <Modal
          okButtonProps={{ style: { display: 'none' } }}
          visible={isModal2Visible}
          onCancel={handleUpdateCancel}
          title={
            <span className="flex justify-center text-green-100 bg-slate-500 rounded-lg p-3 font-sans">
              Add Employee
            </span>
          }
          centered
        >
          <AddEmp handlForm={handlForm} />
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
          <Form form={form} layout="vertical">
            <Form.Item
              name="id"
              label="ID"
              rules={[{ required: true, message: 'Please enter your ID!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="title"
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
              name="disc"
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

const positions = (data) => {
  let options = [];

  const addOptions = (data) => {
    data.forEach((position) => {
      options.push(
        <Select.Option key={position.id} value={position.id}>
          {position.title}
        </Select.Option>
      );

      if (position.children) {
        addOptions(position.children);
      }
    });
  };

  addOptions(data);



  return options;
};



export default DataFromFirebase;
