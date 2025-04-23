import axios from "axios"
const baseUrl = `http://localhost:3000`

export const getAllCity = () => {
    return axios.get(`${baseUrl}/city/getAll`)
}
export const login = (advertiser) => {
    return axios.post(`${baseUrl}/advertiser/login`, advertiser)
}
export const register = (advertiser) => {
    return axios.post(`${baseUrl}/advertiser/register`, advertiser)
}
export const getApartmentById = (id) => {
    return axios.get(`${baseUrl}/apartment/getbyid/${id}`)
}
export const getAllApartments = () => {
    return axios.get(`${baseUrl}/apartment/getAll`)
}
export const getApartmentByCategory = (id) => {
    return axios.get(`${baseUrl}/apartment/getByCatgeory/${id}`)
}
export const getApartmentByCity = (id) => {
    return axios.get(`${baseUrl}/apartment/getByCity/${id}`)
}
export const getBybigbed = (count) => {
    return axios.get(`${baseUrl}/apartment/getBybigbed/${count}`)
}
export const getBySmallbed = (count) => {
    return axios.get(`${baseUrl}/apartment/getBySmallbed/${count}`)
}
export const getApartmentByBigPrice = (price) => {
    return axios.get(`${baseUrl}/apartment/getBybigprice/${price}`)
}
export const getApartmentBySmallprice = (price) => {
    return axios.get(`${baseUrl}/apartment/getBySmallprice/${price}`)
}
export const getApartmentByAdvertiser = (id,token) => {
    return axios.get(`${baseUrl}/apartment/getByAdvertiser/${id}`, {headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }})
}

export const createApartment = (formData, token) => {
    return axios.post(`${baseUrl}/apartment/create`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
    })
}


export const updateApartment = (apartmentId, advertiserId, formData) => {
    return axios.patch(`/api/apartments/${advertiserId}/${apartmentId}`, formData, {
        headers: {
            // Authorization: `Bearer ${token}`, // שימוש בכותרת Authorization
            "Content-Type": "multipart/form-data" // אם אתה שולח תמונה
        }
    });
};

export const deleteApartment = (id, idAdvertist, token) => {
    return axios.delete(`${baseUrl}/apartment/remove/${idAdvertist}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getAllCategory = () => {
    return axios.get(`${baseUrl}/category/getAll`)
}

export const createCategory = async (category, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // שולחים את האסימון בכותרת
        },
    };
    return axios.post('http://localhost:3000/category/create', category, config);
};


export const createCity = async (city, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // שולחים את האסימון בכותרת
        },
    };
    return axios.post('http://localhost:3000/city/create', city, config);
};
