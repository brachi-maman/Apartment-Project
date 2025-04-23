
import { Route, Routes } from 'react-router-dom';
import { Home } from "./Home"
import { Apartment } from './Apartment';
import { Login } from './Login';
import { UpdateApartment } from './UpdateApartment';
import { CreateApartment } from './CreateApartment';
import { Register } from './Register';
import { MyApartments } from './MyApartments';

export const Routing = () => {
    return <>
        <Routes>
            <Route path="home" element={<Home></Home>}></Route>
            <Route path="createApartment" element={<CreateApartment></CreateApartment>}></Route>
            <Route path="apartment/:id" element={<UpdateApartment></UpdateApartment>}></Route>
            <Route path="apartment" element={<Apartment></Apartment>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="my-apartments" element={<MyApartments />} /> {/* מסלול חדש */}

        </Routes>
    </>
}