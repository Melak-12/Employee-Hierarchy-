import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
const UpdateForm = ({treeData,selectedRecord,handleUpdateForm}) => {
    const { register, reset, handleSubmit } = useForm()
    const [errors, setErrors] = useState({});

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
            position: position,
            description: description, 
            parentId:parentId||'',
            name: name
          };
          const newErrors = {};
 
          if (!parentId) {
            newErrors.parentId = 'Parent Position is required';
          }
      
          if (!position) {
            newErrors.position = 'Position is required';
          }
      
          if (!name) {
            newErrors.name = 'Name is required';
          }
          setErrors(newErrors);
      
          if (Object.keys(newErrors).length === 0) {
            console.warn("update form values are  is" +newChild.name)
            handleUpdateForm(newChild);
            reset();
          }
    }

  return (<>
    <form
        className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
        onSubmit={handleSubmit(onSubmit)}
        >
        <div>
          
          <label className="text-gray-600  font-medium">Position</label><br />
          <input className={`border-solid border-gray-300 border py-2 mb-5 px-4 w-full rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500
          ${ errors.position&& 'border-red-500'}`}
            name="position"
            placeholder="CEO, Backend Engineer, etc."
                    {...register('position')}
                    defaultValue={selectedRecord.position}
          />
          {errors.position && <span className="text-red-500">{errors.position}</span>}
          <br />

          <label className="text-gray-600 font-medium">Description</label>
          <textarea
            className="border-solid mb-5 border-gray-300 border py-2 px-4 w-full rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            name="disk"
            placeholder="owner of the company,..."
                    {...register('description')}
                    defaultValue={selectedRecord.description}
                    
          />
            
          <br />


          <label className="text-gray-600 font-medium">Parent Position</label><br />
          <select className={`border-solid mb-5 border-gray-300 border py-2 px-4 w-full rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500
           ${
              errors.parentId && 'border-red-500' }`}
            name="parentId"
            {...register('parentId')}
          >
          {positions(treeData)}
          </select>
          {errors.parentId && <span className="text-red-500">{errors.parentId}</span>}
          <br />

          <label className="text-gray-600 font-medium">Name</label><br />
          <input className={`border-solid mb-5 border-gray-300 border py-2 px-4 w-full rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500
          ${errors.name && 'border-red-500' }`}
            name="name"
            placeholder="yemariam,elsabet etc."
                    {...register('name')}
                    defaultValue={selectedRecord.name}
                    
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

export default UpdateForm