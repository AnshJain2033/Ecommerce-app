import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
export default function useCategories() {
    const [categories, setCategories] = useState([])
    //get All categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return categories
}