// context creation
// provider 
// consumer lengthy remove
// useContext hooks

//context creation
import React, { useContext, useReducer , useEffect} from 'react';
import reducer from './reducer';

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading : true,
    query: "html",
    nbPages: 50,
    page: 0,
    hits : [],
}

const AppContext = React.createContext();

//provider
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    
    const fetchApiData = async(url) =>{

        dispatch({type: "SET_LOADING"});

      try{
        const res =await fetch(url); 
        const data = await res.json();
        console.log(data);
        dispatch({
            type: "GET_STORIES",
            payload: {
                hits: data.hits,
                nbPages: data.nbPages,
                page: data.page
            }
        });        
      }
      catch (error){
        console.log(error);
      }
    };

    // pagination
    const prevPage = ()=>{
      dispatch({type: "LEFT"});
    };

    const nextPage =()=>{
      dispatch({type:"RIGHT"});
    };

    // search query
    const changeQuery = (value) =>{
      dispatch({type: "SEARCH_QUERY", payload: value});
    };
    // remove post 
    const removePost = (objectID) => {
      dispatch({type:"REMOVE_POST", payload: objectID});  
    }

    useEffect(()=>{
      fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    return <AppContext.Provider value={{...state,removePost,changeQuery,prevPage,nextPage}}>{children}</AppContext.Provider>
}

// custom hooks
const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext};