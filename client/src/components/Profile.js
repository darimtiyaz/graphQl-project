import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../gqlOperations/queries';
import { DELETE_QUOTE, UPDATE_QUOTE } from '../gqlOperations/mutations';
import {useNavigate} from 'react-router-dom'

const Profile = () => {
    const [updateQuoteData,setUpdateQuoteData] = useState("")
    const [fieldShow, setFieldShow] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const navigate  = useNavigate()
    const [deleteQuote] = useMutation(DELETE_QUOTE, {
        refetchQueries: [{ query: GET_MY_PROFILE }]
     });
    const [updateQuote] = useMutation(UPDATE_QUOTE, {
        refetchQueries: [{ query: GET_ALL_QUOTES }]
    });
    const {loading,error,data} = useQuery(GET_MY_PROFILE)
    if(!localStorage.getItem("token")){
            navigate("/login")
            return <h1>unauthorized</h1>
    }

    const handleDelete = (id) => {
       deleteQuote({variables:{_id: id}})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateQuote({
            variables:{
                _id: currentId,
                name: updateQuoteData
            }
        })
        setFieldShow(false);
    }
    
    if(loading) return <h2>Profile is loading</h2>
    if(error){
        console.log(error)
    }

    return (
        <div className="container my-container profile-container">
            <div className="center-align">
                <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data?.user?.firstName}.png?size=200x200`} alt="pic" />
                <h5>{data.user.firstName} {data?.user?.lastName}</h5>
                <h6>Email - {data?.user?.email}</h6>
            </div>
             <h3>Your quotes</h3>
             {data.user.quotes.map((quote, index)=>{
                return (
                    <blockquote key={index}>
                        <span><h6>{quote.name}</h6>
                        <button className="blue btn" onClick={()=> {setFieldShow(true); setCurrentId(quote._id); setUpdateQuoteData(quote.name)}}>Update</button>
                        {" "}<button className="red btn" onClick={()=> handleDelete(quote._id)}>Delete</button>
                        </span>
                       { 
                        fieldShow && currentId===quote._id ? <form onSubmit={handleSubmit}>
                             <input 
                                 type="text" 
                                 value={updateQuoteData}
                                 onChange={e=>setUpdateQuoteData(e.target.value)}
                                 placeholder="write your quote here"
                                 />
                              <button className="btn green" type="submit">update quote</button>
                         </form> : ""}
                        
                    </blockquote>
                )
             })}
        </div>
    )
}

export default Profile