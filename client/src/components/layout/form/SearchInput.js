import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../../context/search.js'
const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        console.log('Done')
        e.preventDefault()
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            navigate('/search')
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <form className="d-flex" role='search' onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" type="search"

                    value={values.keyword}
                    onChange={(e) => { setValues({ ...values, keyword: e.target.value }) }}
                    placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchInput