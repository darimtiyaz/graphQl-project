import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../gqlOperations/queries';
import {useParams} from 'react-router-dom'
export default function OtherUserProfile() {
    const {userid} = useParams()
    const {loading,error,data} = useQuery(GET_USER_BY_ID,{
        variables:{userid}
    })

    if(loading) return <h2>Profile is loading</h2>
    if(error){
        console.log(error)
    }
    console.log('dataaaaaaaaa', data)
    return (
        <div className="container my-container">
            <div className="center-align">
                <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data.user.firstName}.png?size=200x200`} alt="pic" />
                <h5>{data.user.firstName} {data.user.lastName}</h5>
                <h6>Email - {data.user.email}</h6>
            </div>
             <h3>{data.user.firstName}'s quotes</h3>
             {
                 data.user.quotes.map((quo, index)=>{
                     return(
                         <blockquote key={index}>
                            <h6>{quo.name}</h6>
                        </blockquote> 
                     )
                 })
             }
        </div>
    )
}