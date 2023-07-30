// import { Form, Input, Modal, Select, message } from 'antd'
// import React, { useState } from 'react'
// import { updateRecord } from '../model/DataFromFirebase'
// import firebase from '../config/FirebaseConfig';


// const UpdatePosition = ({treeData,selectedRecord,setTreeData,setIsModalVisible,isModalVisible,handleUpdate}) => {
//     const [showSpinner, setShowSpinner] = useState(false);
    
//      const [form] = Form.useForm();

    
//     const handleUpdateCancel = () => {
//         // setIsModal2Visible(false);
//         setIsModalVisible(false);
//         form.resetFields();
//     };
  
//     //! here
//     const handleUpdateSubmit = () => {
//         setShowSpinner(true);
    
//         form.validateFields().then((values) => {
//           const updatedRecord = {
//             ...selectedRecord,
//             // id: values.id,
//             position: values.position||'',
//             name: values.name,
//             description: values.description,
//             parentId: values.parentId||'',
//           };
    
//           if (values.parentId !== '') {
//             updatedRecord.parentId = values.parentId;
//           }
//           console.log("new values are"+updatedRecord)
    
//           const updatedTreeData = updateRecord(treeData, updatedRecord);
    
//           const treeRef = firebase.database().ref('tree');
//           treeRef.set(updatedTreeData)
//             .then(() => {
//               setTimeout(() => {
//                 setShowSpinner(false);
//               }, 2000);
//               message.success({
//                 content: (<span className='text-green-700 border-2 rounded-lg border-green-500 font-sans p-2 pl-5 pr-7 mr-4 font-bold text-2xl'> Updated Successfully!</span>),
//                 style: {
//                   marginTop: '40vh',  borderColor:"green",borderRadius:"10px",color:"red"
//                 },
//               });
                        
//             })
//             .catch((error) => {
//               console.error('error updating record:', error);
//             });
    
//           setTreeData(updatedTreeData);
//           setIsModalVisible(false);
//           form.resetFields();
//         });
//       };

//   return (
//       <>
//       <Modal
//         title={
//           <span className="flex justify-center text-green-100 bg-slate-500 rounded-lg p-3 font-sans">
//             Update Employee Position
//           </span>
//         }
//         visible={isModalVisible}
//         onOk={handleUpdateSubmit}
//         onCancel={handleUpdateCancel}
//         okButtonProps={{ style: { color: 'white', backgroundColor: '#00cc00' } }}>
//           <Form form={form} layout="vertical">
//             {/* <Form.Item
//               name="id"
//               label="ID"
//               rules={[{ required: true, message: 'Please enter your ID!' }]}
//             >
//               <Input />
//             </Form.Item> */}
//             <Form.Item
//               name="position"
//               label="Position"
//               rules={[{ required: false, message: 'Please enter your Position!' }]}
//             >
//               <Input disabled />
//             </Form.Item>
//             <Form.Item
//               name="name"
//               label="Name"
//               rules={[{ required: true, message: 'Please enter an Employee name!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="description"
//               label="Description"
//               rules={[{ required: false, message: 'Please enter a Description!' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item name="parentId" label="Parent Position">
//               <Select>
//                 {positions(treeData)}
//               </Select>
//             </Form.Item>
//           </Form>
//       </Modal>
//       </>
//   )
// }

// export default UpdatePosition


// const positions = (data) => {
//     let options = [];
  
//     const addOptions = (data) => {
//       data.forEach((p) => {
//         options.push(
//           <Select.Option key={p.id} value={p.id}>
//             {p.position}
//           </Select.Option>
//         );
  
//         if (p.children) {
//           addOptions(p.children);
//         }
//       });
//     };
  
//     addOptions(data);
  
  
  
//     return options;
//   };