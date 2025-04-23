
import { useNavigate } from "react-router-dom"; // ודא ש-import של useNavigate
import { useDispatch, useSelector } from 'react-redux';
import '../style.css';

export const CardCategory = ({ category }) => {
    return (
        <div className="city">
            <p>{category.name}</p>
        </div>
    );
};

export const CardCity = ({ city }) => {
    return (
        <div className="city">
            <p>{city.name}</p>
        </div>
    );
};

export const CardApartment = ({ apartment }) => {
    const dis = useDispatch()
    const navigate = useNavigate(); // יש להגדיר את ה-useNavigate בתוך הקומפוננטה
    const currentAdvertiser = useSelector(state => state.currentAdvertiser)
    const token = useSelector(s => s.token)


    return (
        <div className="apartment">
            {apartment.name && <h3>{apartment.name}</h3>}
            <p>{apartment.description}</p>
            {apartment.imge && (
                <img
                    src={`http://localhost:3000${apartment.imge}`}
                    className="apartment-image"
                    alt="Apartment"
                />
            )}
            <p><strong>Address:</strong> {apartment.address}</p>
            <p><strong>Beds:</strong> {apartment.countbed}</p>
            <p><strong>City:</strong> {apartment.city?.name}</p>
            <p><strong>Category:</strong> {apartment.category.name}</p>
            <p><strong>Add-ons:</strong> {apartment.add}</p>
            <p><strong>Price:</strong> ${apartment.price}</p>
        </div>
    );
};

