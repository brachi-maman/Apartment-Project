
import {
    getAllApartments,
    getApartmentByAdvertiser,
    getApartmentByBigPrice,
    getApartmentByCategory,
    getApartmentByCity,
    getApartmentById,
    getApartmentBySmallprice,
    getBybigbed,
    getBySmallbed,
} from "../api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApartmentStore } from "./store/Actions";
import swal from "sweetalert";
export const GetApartment = ({ id, type }) => {
    console.log(type, id);
    const currentAdvertiser = useSelector(state => state.currentAdvertiser)
    const [apartment, setApartment] = useState();
    const [apartments, setApartments] = useState([]);
    const storedApartments = useSelector((store) => store.apartment);
    const token = useSelector(s => s.token);
    const dispatch = useDispatch();
    const dis = useDispatch();
    useEffect(() => {

        const fetchData = async () => {
            try {
                let response;
                switch (type) {
                    case "byId":
                        {
                            getApartmentById(id).then(s => {
                            })
                                .catch(err => {
                                })
                            break;
                        }
                    case "byCity":
                        {
                            getApartmentByCity(id).then(s => {
                                console.log(s.data);
                                setApartments(s.data);
                            })
                                .catch(err => {
                                    console.log(err);
                                })
                            break;
                        }
                    case "byCategory":
                        {
                            getApartmentByCategory(id).then(s => {
                                console.log(s.data);
                                setApartments(s.data);
                            })
                                .catch(err => {
                                    console.log(err);
                                })
                            break;
                        }
                    case "getAllyourApartment":
                        {
                            getApartmentByAdvertiser(id, token).then(s => {
                                console.log(s.data);
                                setApartments(s.data);
                            })
                                .catch(err => {
                                    console.log(err);
                                })
                            break;
                        }
                    case "getAll":
                        if (storedApartments.length > 0) {
                            setApartments(storedApartments);
                        } else {
                            response = await getAllApartments();
                            setApartments(response.data);
                            dispatch(setApartmentStore(response.data));
                        }
                        break;
                    case "getByBigPrice":
                        response = await getApartmentByBigPrice(id);
                        setApartments(response.data);
                        break;
                    case "getBybigbed":
                        response = await getBybigbed(id);
                        setApartments(response.data);
                        break;
                    case "getBySmallprice":
                        response = await getApartmentBySmallprice(id);
                        setApartments(response.data);
                        break;
                    case "getBySmallbed":
                        response = await getBySmallbed(id);
                        setApartments(response.data);
                        break;
                    default:
                        throw new Error("Invalid filter type.");
                }
            } catch (err) {
                const errorMessage = err.response?.data?.error || err.message;
                swal("Error", errorMessage + "❌❌", "error");
            }
        };
        fetchData();
    }, []);
    console.log(currentAdvertiser._id)

    return (
        <>
            {apartment && (
                <div className="apartment">
                    {apartment?.imge && (
                        <img
                            src={`http://localhost:3000${apartment.imge}`}
                            className="apartment-image"
                            alt="Apartment"
                        />
                    )}
                    <p>Name: {apartment.name}</p>
                    <p>Category: {apartment.category?.name}</p>
                    <p>City: {apartment.city?.name}</p>
                    <p>Email: {apartment.advertist.email}</p>
                    <p>Phone: {apartment.advertist.phon}</p>
                    <p>Address: {apartment.address}</p>
                    <p>Count Beds: {apartment.countbed}</p>
                    <p>Price: {apartment.price}</p>
                    <p>Additions: {apartment.add}</p>
                </div>
            )}
            {apartments && apartments.length > 0 ? (
                apartments.map((apartment) => (
                    <div key={apartment._id} className="apartment">
                        {apartment.imge && (
                            <img
                                src={`http://localhost:3000${apartment.imge}`}
                                className="apartment-image"
                                alt="Apartment"
                            />
                        )}
                        <p>Name: {apartment.name}</p>
                        <p>Category: {apartment.category?.name}</p>
                        <p>City: {apartment.city?.name}</p>
                        <p>Email: {apartment.advertist.email}</p>
                        <p>Phone: {apartment.advertist.phon}</p>
                        <p>Address: {apartment.address}</p>
                        <p>Count Beds: {apartment.countbed}</p>
                        <p>Price: {apartment.price}</p>
                        <p>Additions: {apartment.add}</p>
                    </div>
                ))
            ) : (
                <p>No apartments found</p>
            )}
        </>
    );
};
