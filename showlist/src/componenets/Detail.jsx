import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Details = ({ match = {} }) => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [bookings, setBookings] = useState(JSON.parse(localStorage.getItem('bookings')) || []);
    const [formData, setFormData] = useState({
        movie_name: "",
        user_name: "",
        no_of_seats: ""
    })

    useEffect(() => {
        fetch("https://api.tvmaze.com/search/shows?q=all").then(res=> res.json())
        .then((d) => {
            setData(d?.find(i => i?.show?.id === Number(id))?.show);
        })
    },[id])

    const submitBookings = (e) => {
        e.preventDefault();
        const payload = {...formData, movie_name: data?.name};
        console.log(formData, 'check1')
        setBookings([...bookings, payload]);
        localStorage.setItem('bookings', JSON.stringify([...bookings, payload]));
        setOpen(false);
    }


    return(
        <>
        <div>
            <h1>Movie-{data?.name}</h1>
            <img src={data?.image?.original} style={{ width:"50%"}}/>
            <h2>Language-{data?.language}</h2>
            <p>Genres-{data?.genres}</p>
            <h3>Visit-{data?.officialSite}</h3>
            <h2>Runtime-{data?.runtime}</h2>
            <h2>Country-{data?.network?.country?.name}</h2>
            <div style={{color:"white", width:"35%",margin:"0 auto"}}>{data?.summary}</div>
            <button style={{marginTop:"10px"}}onClick={() => setOpen(true)}>Book ticket</button>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#333'}}>
                        Book ticket
                    </Typography>
                    <form onSubmit={submitBookings}>
                        <input type="text" value={data?.name} disabled />
                        <input type="text" placeholder="UserName" onInput={(e) => setFormData({...formData, user_name: e.target.value })}/>
                        <input type="number" placeholder="How Many seats?" onInput={(e) => setFormData({...formData, no_of_seats: e.target.value })}/> 
                        <button type="submit">Submit</button>
                    </form>
                    </Box>
            </Modal>
        </>
    )
}
export default Details;