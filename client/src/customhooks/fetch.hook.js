import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "../utilities/helper";
// eslint-disable-next-line no-undef
axios.defaults.baseURL= 'http://localhost:8080';

// custom hook to get the user data from the getUser
export default function useFetch(query){
    // state variables
    const [getData, setData]= useState({ isLoading: false, apiData: undefined, status: null, serverError: null});

    useEffect(()=>{

        const fetchData= async ()=>{
            try {
                setData(prev=>({...prev, isLoading: true}))

                // registered username data 
                const {username}= !query? await getUser() : '';

                // make api request to user or to the query 
                const {data, status}= !query
                ? await axios.get(`/api/user/${username}`) 
                : await axios.get(`/api/${query}`)

                if(status === 200){
                    setData(prev => ({ ...prev, isLoading: false, apiData:data, status: status}));
                }
                setData(prev => ({ ...prev, isLoading: false }));
            } catch (error) {
                setData(prev=>({...prev, isLoading: false, serverError: error}))
            }
        };
        fetchData()
    }, [query])

    return  [ getData, setData];
}