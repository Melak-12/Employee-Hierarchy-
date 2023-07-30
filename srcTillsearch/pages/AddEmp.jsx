import axios from 'axios';
import React, { useEffect, useState } from 'react'
import firebase from '../config/FirebaseConfig'

import { useForm } from "react-hook-form";

const EmpForm = ({ handlForm ,treeData}) => {
  const { register, handleSubmit,reset } = useForm();
  // const [treeData, setTreeData] = useState([]);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://employee-stracture-default-rtdb.firebaseio.com/tree.json'
  //       );

  //       if (response.data) {
  //         const formattedData = Object.keys(response.data).map((key) => ({
  //           key,
  //           ...response.data[key],
  //         }));
  //         setTreeData(formattedData);
  //       }
  //     } catch (error) {
  //       console.error('error fetching tree data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const positions = (data) => {
    let options = [];

    const addOptions = (data) => {
      data.forEach((position) => {
        options.push(
          <option key={position.id} value={position.id}>
            {position.position}
          </option>
        );

        if (position.children) {
          addOptions(position.children);
        }
      });
    };

    addOptions(data);

    return options;
  };

  const onSubmit = (data) => {
    const {  position, description, parentId, name } = data;
    const newChild = {
      // id: "",
      position: position||'',
      description: description, 
      parentId:parentId||'',
      name: name
    };
  
    const newErrors = {};

 
    if (!parentId) {
      newErrors.parentId = 'Parent Position is required';
    }

    if (!position) {
      newErrors.role = 'Position is required';
    }

    if (!name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("parentId is"+parentId,newChild.id)
      handlForm(newChild);
      reset();
    }
  };

  return (
    <>
      <form
        className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
        onSubmit={handleSubmit(onSubmit)}
        >
        <div>
          
          <label className="text-gray-600  font-medium">Position</label><br />
          <input className={`border-solid border-gray-300 border py-2 mb-5 px-4 w-full rounded text-gray-700 
          ${ errors.position ? 'border-red-500' : 'border-green-600 border-2'}`}
            name="position"
            placeholder="CEO, Backend Engineer, etc."
            {...register('position')}
          />
          {errors.position && <span className="text-red-500">{errors.position}</span>}
          <br />

          <label className="text-gray-600 font-medium">Description</label>
          <textarea
            className="border-solid mb-5 border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
            name="disk"
            placeholder="owner of the company,..."
            {...register('description')}
          />
            
          <br />


          <label className="text-gray-600 font-medium">Parent Position</label><br />
          <select className={`border-solid mb-5 border-gray-300 border py-2 px-4 w-full rounded text-gray-700 ${
              errors.parentId ? 'border-red-500' : 'border-green-600 border-2' }`}
            name="parentId"
            {...register('parentId')}
          >
          {positions(treeData)}
          </select>
          {errors.parentId && <span className="text-red-500">{errors.parentId}</span>}
          <br />

          <label className="text-gray-600 font-medium">Name</label><br />
          <input className={`border-solid mb-5 border-gray-300 border py-2 px-4 w-full rounded text-gray-700 
          ${errors.name ? 'border-red-500' : 'border-green-600 border-2'}`}
            name="name"
            placeholder="yemariam,elsabet etc."
            {...register('name')}
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
          

        </div>

        <button
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default EmpForm;