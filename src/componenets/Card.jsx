import React, { useEffect, useState } from "react"
import Details from "./Detail"

function Card(){
    const[data, setData]=useState([])
    const[detail,setDetail]=useState([])

    const fetchData=() =>{
        fetch("https://api.tvmaze.com/search/shows?q=all").then(res=> res.json())
        .then(data => setData(data))
    }

    useEffect(() =>{
        fetchData()
    },[])


    return(
        <>  
        <div>
        <h1>Movie List</h1>
        
            {
                data &&
                data.map((ele) => {

                    const{image,name,url,language,genres,id}=ele.show;
                    return(
                    <div className="box-style">
                        <div className="font">
                        <img src={image?.original} alt={name} width="50%"/>
                        <h2>Movie-{name}</h2>
                        <p>{url}</p>
                        <h2>Genres-{genres}</h2>
                        <h3>Language-{language}</h3>
                        <a href={`/movie/${id}`}>Detail</a>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        </>
    )
}
export default Card;