import { useSelector } from 'react-redux';
import '../style.css';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
    const currentAdvertiser = useSelector((store) => store.currentAdvertiser);

    return (
        <div className="nav"> 
            <NavLink to='/login' className='link'>Login</NavLink>
            <NavLink to='/home' className='link'>Home</NavLink>
            <NavLink to='/apartment' className='link'>OurApartment</NavLink>
            {currentAdvertiser._id&& (
        <>
            <NavLink to="/createapartment" className='link'>Create Apartment</NavLink>
          <NavLink to="/my-apartments" className='link'>My Apartments</NavLink>
        </>
    )}
        </div>
    );
}

