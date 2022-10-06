import {ALL_MOVIES,ADD_LIKE,REMOVE_LIKE,ADD_DISLIKE,REMOVE_DISLIKE} from "./types"
const initState={
    movies:[],
    categories:[],
    Likes:[],
    Dislikes:[]
}

export default function  moviesReducer  (state=initState,action){
   
    
    switch (action.type){
      
        case ALL_MOVIES:
            const categ =  action.payload.map((index)=>{
          
                return index.category
              })
   
            return{
               ...state,
               movies:  action.payload,
               categories:[...new Set(categ)]
        };
        case ADD_LIKE: 
      
      const movie =  state.movies.map((index)=>{
        if(index.id===action.payload){
            index.likes++    
        }
        return index
      })
   
        return{
            ...state,
          movies:movie,
          Likes:[...state.Likes,action.payload]
        }
      
        case REMOVE_LIKE: 
        const removelike =  state.movies.map((index)=>{
          if(index.id===action.payload){
              index.likes--   
          }
          return index;
        }
          )
        const dislikes =   state.Dislikes.filter(function(values, index, arr){ 
          return values != action.payload})
          return{
            ...state,
          movies:removelike,
          Likes:dislikes
        };
      case ADD_DISLIKE:
     
        const adddislik =  state.movies.map((index)=>{
          if(index.id===action.payload){
              index.dislikes++    
          }
          return index
        })
     
          return{
              ...state,
            movies:adddislik,
            Dislikes:[...state.Likes,action.payload]
          }
        case REMOVE_DISLIKE:
       
          const removedislik =  state.movies.map((index)=>{
            if(index.id===action.payload){
                index.dislikes--   
            }
            return index
          })
          const removedislikes =   state.Dislikes.filter(function(values, index, arr){ 
            return values != action.payload})
            return{
              ...state,
            movies:removedislik,
            Dislikes:removedislikes
          };
        default:
            return state;
        }
        
    }
    



