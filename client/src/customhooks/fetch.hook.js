import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../utilities/helper";

axios.defaults.baseURL= import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

// custom hook to get the user data from the getUser
export default function useFetch(query){
    // state variables
    const [getData, setData]= useState({ isLoading: false, apiData: undefined, status: null, serverError: null});

    useEffect(()=>{

        const fetchData= async ()=>{
            try {
                setData(prev=>({...prev, isLoading: true}))

                // registered username data 
                const {username}= !query? await getUsername() : '';

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