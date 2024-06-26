import React from 'react'
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import {createCategory, fetchCourseCategories} from '../../../../services/operations/courseDetailsAPI'

export const AddCategory = () => {

    const { token } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        category: "",
        description: "",
    })

    const { category, description } = formData

    const[changed, setChanged] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    useEffect( () => {
        const fetchCategories = async() => {
            const res = await fetchCourseCategories();
            console.log("Result : ", res);
            setCategoriesData(res);
            console.log("categoriesData ",categoriesData)
            setChanged(false);
        }
        fetchCategories();
    },[changed])

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setChanged(true);
        createCategory(category, description, token);
        setFormData({
            category: "",
            description: "",
        })
    }

  return (
    <div>
        <div className="mt-10 rounded-md bg-richblack-800 p-6 py-10">
            <p className="text-center text-lg font-semibold text-richblack-5">
                Create New Category
            </p>
            
            <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex flex-row justify-around gap-y-4"
            >
            <label className="">
                <p className="mb-1 text-richblack-5">
                Category Name<sup className="text-pink-200">*</sup>
                </p>
                <input
                required
                type="text"
                name="category"
                value={category}
                onChange={handleOnChange}
                placeholder="Enter category name"
                className="form-style"
                />
            </label>
    
            <label className="">
                <p className="mb-1 text-richblack-5">
                Description <sup className="text-pink-200">*</sup>
                </p>
                <input
                required
                type="textArea"
                name="description"
                value={description}
                onChange={handleOnChange}
                placeholder="Enter Description"
                className="form-style"
                />
            </label>

            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[30px] font-bold text-richblack-900"
            >
                Create
            </button>
            </form>
        </div>

        <div className="mt-10 rounded-md bg-richblack-800 p-6 py-5">
            <p className="mb-5 text-lg font-semibold text-richblack-5">
                Available Categories
            </p>

            <ol>
                {categoriesData?.map((ct, ind) => {
                    return <li key={ind} className="text-richblack-5">
                        {ind+1}. {ct.name}
                    </li>
                })}
            </ol>

            <div>
            
            </div>
        </div>        

    </div>
  )
}
