
import { useEffect, useState } from "react";
import { deleteApartment, getApartmentByAdvertiser } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { deleteApartments } from "./store/Actions";
import { useNavigate } from "react-router";

export const MyApartments = () => {
    const [apartments, setApartments] = useState([]);
    const currentAdvertiser = useSelector(state => state.currentAdvertiser)
    const token = useSelector(s => s.token)
    const dis = useDispatch();
    const navigate = useNavigate(); // יש להגדיר את ה-useNavigate בתוך הקומפוננטה

    useEffect(() => {
        if (currentAdvertiser?._id) {
            getApartmentByAdvertiser(currentAdvertiser._id, token)
                .then((res) => {
                    setApartments(res.data);
                })
                    .catch((err) => {
                    console.error(err);
                    alert("Failed to fetch your apartments");
                });
        }
    }, [currentAdvertiser, token]);
    
        const deleteApartmentHandler = (id) => {
            deleteApartment(id, currentAdvertiser._id, token)
                .then((x) => {
                    alert("deleted");
                    dis(deleteApartments(id))
                    navigate(`/apartment`)
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.error || "Unknown error";
                    alert(`${errorMessage}`);
                });
        };
        const handleUpdateClick = (advertistId, apartmentId) => {
            navigate(`/updateApartment/${advertistId}/${apartmentId}`);
        };
    return (
        <div className="apartment">
            <h1>My Apartments</h1>
            {apartments.length > 0 ? (
                apartments.map((apartment) => (
                    <div key={apartment._id} className="apartment-card">
                        {apartment?.imge && (
                            <img
                                src={`http://localhost:3000${apartment.imge}`}
                                className="apartment-image"
                                alt="Apartment"
                            />
                        )}
                        <p><strong>Name:</strong> {apartment.name}</p>
                        <p><strong>Category:</strong> {apartment.category?.name}</p>
                        <p><strong>City:</strong> {apartment.city?.name}</p>
                        <p><strong>Email:</strong> {apartment.advertist?.email}</p>
                        <p><strong>Phone:</strong> {apartment.advertist?.phon}</p>
                        <p><strong>Address:</strong> {apartment.address}</p>
                        <p><strong>Count Beds:</strong> {apartment.countbed}</p>
                        <p><strong>Price:</strong> {apartment.price}</p>
                        <p><strong>Additions:</strong> {apartment.add}</p>
                        <button onClick={() => deleteApartmentHandler(apartment._id)}>מחק דירה</button>
                        <button onClick={() => navigate(`/apartment/${apartment._id}`)}>עדכון</button>
                    </div>
                ))
            ) : (
                <p>No apartments found.</p>
            )}
        </div>
    );
};
