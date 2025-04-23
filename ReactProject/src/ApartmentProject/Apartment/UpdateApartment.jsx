import { useEffect, useState } from "react";
import { getApartmentById, updateApartment, getAllCategory, getAllCity } from "../api";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/Actions";
import { CreateCity } from "./CreateCity";
import { CreateCategory } from "./CreateCategory";
import '../style.css';

export const UpdateApartment = () => {
    const currA = useSelector((state) => state.currentAdvertiser);
    const { apartmentId } = useParams(); // Get apartmentId from URL
    const [categories, setCategories] = useState([]);
    const [citys, setCities] = useState([]);
    const [image, setImage] = useState(null);

    // State for input fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [bedsCount, setBedsCount] = useState('');
    const [price, setPrice] = useState('');
    const [additions, setAdditions] = useState('');
    const navigate = useNavigate();
    const token = useSelector(s => s.token);

    useEffect(() => {
        // Fetch the apartment details if apartmentId is available
        if (apartmentId) {
            getApartmentById(apartmentId)
                .then((x) => {
                    const apartment = x.data;
                    setName(apartment.name);
                    setDescription(apartment.description);
                    setCategory(apartment.category._id);
                    setCity(apartment.city._id);
                    setAddress(apartment.address);
                    setBedsCount(apartment.countbed);
                    setPrice(apartment.price);
                    setAdditions(apartment.add);
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.error || "Unknown error";
                    
                    
console.error(errorMessage);
                    alert(`${errorMessage} 🙁`);
                });
        }

        // Fetch categories
        getAllCategory()
            .then((x) => setCategories(x.data))
            .catch((err) => {
                const errorMessage = err.response?.data?.error || "Unknown error";
                console.error(errorMessage);
                alert(`${errorMessage} 🙁`);
            });

        // Fetch cities
        getAllCity()
            .then((x) => setCities(x.data))
            .catch((err) => {
                const errorMessage = err.response?.data?.error || "Unknown error";
             
console.error(errorMessage);
                alert(`${errorMessage} 🙁`);
            });
    }, [apartmentId]);

    const updateApartmentDetails = (event) => {
        event.preventDefault();
        const formData = new FormData(); // Allows file uploads
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("city", city);
        formData.append("advertist", currA._id);
        formData.append("address", address);
        formData.append("countbed", bedsCount);
        formData.append("price", price);
        formData.append("add", additions);
        if (image) {
            formData.append("img", image);
        }
        updateApartment(apartmentId, formData, token)
            .then(() => {
                swal(``, '', 'success');
                navigate("/apartment");
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.error || "Unknown error";
                alert(`${errorMessage} 👩`);
            });
    };

    return (
        <>
            <form onSubmit={updateApartmentDetails} className="apartment-form">
                <div className="form-header">
                    <h1 className="form-title">Update Apartment</h1>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                        <option value="">Select City</option>
                        {citys.map((city) => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Beds Count"
                        value={bedsCount}
                        onChange={(e) => setBedsCount(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Additions"
                        value={additions}
                        onChange={(e) => setAdditions(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <h2 htmlFor="imageUpload" className="form-label">בחר תמונה:</h2>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-file-input"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Update Apartment
                    </button>
                </div>
            </form>
        </>
        )
    }