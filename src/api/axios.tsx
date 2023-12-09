import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/eta/v1',
    headers: {
        'Content-Type': 'application/json' // Correcting 'Application/json' to 'application/json'
    }
});

export default instance;