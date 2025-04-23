export const setCurrentAdvertiser = (advertiser) => {
    return { type: 'SET_CURRENT_ADVERTISER', payload: advertiser }
}
export const setToken = (token) => {
    return { type: 'SET_TOKEN', payload: token }
}
export const setCity = (cities) => {
    return { type: 'SET_CITY', payload: cities}
}
export const setCategory = (categories) => {
    return { type: 'SET_CATEGORY', payload:categories}
}
export const setApartmentStore = (apartments) => {
    return { type: 'SET_APARTMENT', payload:apartments}
}
export const deleteApartments = (index) => {
    return { type: 'DELETE_APARTMENT', payload: index }
}