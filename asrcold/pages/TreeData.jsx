import firebase from '../config/FirebaseConfig'
import { Tree, Button, Modal } from 'antd';
import '../style/tree.css'
import axios from 'axios'
import { useState,useEffect } from 'react';
const treeData = [
  {
    title: "CEO"
    , name: "melak",
    disc:"owner"
      
      // (
      //   <div className="flex justify-center m-3"><Button onClick={()=>showDetails("0-0","CEO","NOParentID")} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded ">Melak
      //       </Button></div>
      // ),
    ,
   
    id: '0-0',
    children: [
      {
        title: "CTO",
        disc:"mentor",
          // (
          //   <span
          //     style={{
          //       color: '#1677ff',marginBottom:13,padding:3,
          //     }}
          //   >
          //     CTO
          //   </span>
          // ),
        id: '0-0-0',
        // disabled: true,
        children: [
          {
            title:"PM",
              // (
              //   <span
              //     style={{
              //       color: '#1677ff',marginBottom:13,padding:3,
              //     }}
              //   >
              //     PM
              //   </span>
              // ),
            id: '0-0-0-0',
                disableCheckbox: true,
                children: [
                    {
                        title: "PO",
                        id: '0-0-0-0-0',
                        children: [
                            {
                                title: "TechLead",
                                id: '0-0-0-0-0-0',
                                children: [
                                    {
                                        title: "frontDev",
                                        id:'0-0-0-0-0-0-0',
                                    },
                                    {
                                        title: "backDev",
                                        id:'0-0-0-0-0-0-1',
                                    },
                                    {
                                        title: "devOPS Engineer",
                                        id:'0-0-0-0-0-0-2',
                                    },
                                    
                                ]
                            },
                            {
                                title: "QA Engineer",
                                id: '0-0-0-0-0-1',
                                
                            },
                            {
                                title: "Scrum Master",
                                id: '0-0-0-0-0-2',
                                
                            }
                        ]
                }
            ]
          },
          
        ],
      },
      {
        title:"CFO",
          // (
          //   <span
          //     style={{
          //       color: '#1677ff',marginBottom:13,padding:3,
          //     }}
          //   >
          //     CFO
          //   </span>
          // ),
        id: '0-0-1',
        children: [
          {
            title:"chif accountant",
            //   (
            //   <span
            //     style={{
            //       color: '#1677ff',margin:32
            //     }}
            //   >
            //     Chif Accountant
            //   </span>
            // ),
                id: '0-0-1-0',
                children: [
                    {
                        title: "financial Analyst",
                         id: '0-0-1-0-0',
                        
                    },
                    {
                        title: "accountant &payable",
                         id: '0-0-1-0-1',
                        
                }
            ],
            },
            {
              title:"IA",
                // (
                //   <span
                //     style={{
                //       color: '#1677ff',margin:32
                //     }}
                //   >
                //    Internal Audit
                //   </span>
                // ),
                    id: '0-0-1-1',
                   
              },
        ],
        },
        {
          title:"COO",
            // (
            //     <span
            //       style={{
            //         color: '#1677ff',marginBottom:13,padding:3,
            //       }}
            //     >
            //       COO
            //     </span>
            //   ),
            id: '0-0-2',
            children: [
              {
                title:"Product Manager",
                //   (
                //   <span
                //     style={{
                //       color: '#1677ff',margin:32
                //     }}
                //   >
                //     Product Manager
                //   </span>
                // ),
                id: '0-0-1-0',
                },
                {
                  title:"Operation manager",
                    // (
                    //   <span
                    //     style={{
                    //       color: '#1677ff',margin:32
                    //     }}
                    //   >
                    //     operation Manager
                    //   </span>
                    // ),
                    id: '0-0-1-1',
                },
                {
                  title:"Custum Manager",
                    // (
                    //   <span
                    //     style={{
                    //       color: '#1677ff',margin:32
                    //     }}
                    //   >
                    //     customer Manager
                    //   </span>
                    // ),
                    id: '0-0-1-2',
                  },
            ],
        },
        {
          title:"HR",
            // (
            //     <span
            //       style={{
            //         color: '#1677ff',marginBottom:13,padding:3,
            //       }}
            //     >
            //       HR
            //     </span>
            //   ),
            id: '0-0-3',
            children: [
              {
                title:"child",
                //   (
                //   <span
                //     style={{
                //       color: '#1677ff',margin:32
                //     }}
                //   >
                //     child
                //   </span>
                // ),
                id: '0-0-1-0',
              },
            ],
          },
        
      ],
    },
];
  
// const treeData = [
//   {
//     title: "CEO",
//     name: "melak",
//     key: "0-0",
//     parentId: null,
//   },
//   {
//     title: "CTO",
//     key: "0-0-0",
//     parentId: "0-0",
//   },
//   {
//     title: "PM",
//     key: "0-0-0-0",
//     parentId: "0-0-0",
//   },
//   {
//     title: "PO",
//     key: "0-0-0-0-0",
//     parentId: "0-0-0-0",
//   },
//   {
//     title: "TechLead",
//     key: "0-0-0-0-0-0",
//     parentId: "0-0-0-0-0",
//   },
//   {
//     title: "frontDev",
//     key: "0-0-0-0-0-0-0",
//     parentId: "0-0-0-0-0-0",
//   },
//   {
//     title: "backDev",
//     key: "0-0-0-0-0-0-1",
//     parentId: "0-0-0-0-0-0",
//   },
//   {
//     title: "devOPS Engineer",
//     key: "0-0-0-0-0-0-2",
//     parentId: "0-0-0-0-0-0",
//   },
//   {
//     title: "QA Engineer",
//     key: "0-0-0-0-0-1",
//     parentId: "0-0-0-0",
//   },
//   {
//     title: "Scrum Master",
//     key: "0-0-0-0-0-2",
//     parentId: "0-0-0-0",
//   },
//   {
//     title: "CFO",
//     key: "0-0-1",
//     parentId: "0-0",
//   },
//   {
//     title: "Chif Accountant",
//     key: "0-0-1-0",
//     parentId: "0-0-1",
//   },
//   {
//     title: "financial Analyst",
//     key: "0-0-1-0-0",
//     parentId: "0-0-1-0",
//   },
//   {
//     title: "accountant & payable",
//     key: "0-0-1-0-1",
//     parentId: "0-0-1-0",
//   },
//   {
//     title: "IA",
//     key: "0-0-1-1",
//     parentId: "0-0-1",
//   },
//   {
//     title: "COO",
//     key: "0-0-2",
//     parentId: "0-0",
//   },
//   {
//     title: "Product Manager",
//     key: "0-0-1-0",
//     parentId: "0-0-2",
//   },
//   {
//     title: "Operation manager",
//     key: "0-0-1-1",
//     parentId: "0-0-2",
//   },
//   {
//     title: "Custum Manager",
//     key: "0-0-1-2",
//     parentId: "0-0-2",
//   },
//   {
//     title: "HR",
//     key: "0-0-3",
//     parentId: "0-0",
//   },
//   {
//     title: "child",
//     key: "0-0-1-0",
//     parentId: "0-0-3",
//   },
// ];

  const showDetails = (id, title, parentId) => {
    Modal.info({
      title: 'Employee Details',
      content: (
        <div>
          <p>ID: {id}</p>
          <p>Position: {title}</p>
          <p>Parent ID: {parentId}</p>
        </div>
      ),
      maskClosable: true,
    });
  };


const TreeData = () => {
  const [treeData2, setTreeData] = useState([])
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



  const treeRef = firebase.database().ref('tree'); 
  const uploadTreeData = () => {
    treeRef.set(treeData)
      .then(() => {
        alert('tree data uploaded to firebase successfully.');
      })
      .catch((error) => {
        alert('Error uploading tree data to firebase:', error);
      });
  };


  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    console.log('oncheck', checkedKeys, info);
  };

  return (
    <>
    <div className='tree-container'style={{borderRadius:9}}>

    <Tree style={{fontSize:32,borderRadius:9,paddingTop:27}}
      // checkable
      className='custom-tree'
      //   defaultExpandedKeys={['0-0-0', '0-0-1']}
      //   defaultSelectedKeys={['0-0-0', '0-0-1']}
      //   defaultCheckedKeys={['0-0-0', '0-0-1']}
      //   onSelect={onSelect}
      //   onCheck={onCheck}
          treeData={treeData2}
      // rootStyle={{ accentColor: "yellow" }}
       />
        
      <button onClick={uploadTreeData}
          className="mt-52 w-full bg-green-500 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
        > upload tree to DB
      </button>
      </div>

     
    </>
  );
};
export default TreeData;
