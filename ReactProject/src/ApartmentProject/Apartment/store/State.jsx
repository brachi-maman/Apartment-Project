
import { produce } from 'immer'
import { createStore } from 'redux';

const initialState={
    currentAdvertiser:[],
    token:"",
    city:[],
    category:[],
    apartment:[]


}
const reducer = produce((state, action) => {
    switch (action.type) {
      case 'SET_CURRENT_ADVERTISER':
        state.currentAdvertiser= action.payload
        break;
        case 'SET_TOKEN':
        state.token= action.payload
        break;
        case 'SET_CITY':
        state.city= action.payload
        break;
        case 'SET_CATEGORY':
        state.category= action.payload
        break;
        case 'SET_APARTMENT':
        state.apartment= action.payload
        break;
        case 'DELETE_APARTMENTS': {
          let index = 0
          for (var i = 0; i < state.apartment.length; i++) {
            if (state.apartment[i].id_ == action.payload)
              index = i;
          }
    
          state.apartments.splice(index, 1)
          break;
        }
        default:
        break;
    }
  }, initialState)

const myStore = createStore(reducer)
window.store= myStore
export default myStore;