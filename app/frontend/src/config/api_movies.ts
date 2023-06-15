import axios from 'axios';

const API_URL = 'http://localhost:5000'

export const getAllMovies = () => {
    axios.get(`${API_URL}/movies/tt0000574`)
    .then((response)=>{
        console.log('ICI');
        console.log(response.data);
    }).catch(error => console.error(`Error : ${error}`))
}