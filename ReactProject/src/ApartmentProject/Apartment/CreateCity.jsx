
import { useEffect, useState } from 'react';
import '../style.css';
import { createCity, getAllCity } from '../api';
import { CardCity } from './Card';
import { useSelector } from 'react-redux';

export const CreateCity = () => {
    const [list, setList] = useState([]);
    const [cityName, setCityName] = useState('');
    const token = useSelector((state) => state.token); // אם האסימון שמור ב-Redux

    useEffect(() => {
        getAllCity()
            .then((x) => {
                setList(x.data);
            })
            .catch((err) => alert(err + ' חבל'));
    }, []);

    const newcity = async (event) => {
        event.preventDefault();
        const city = {
            name: cityName,
        };
    
        try {
            await createCity(city, token); // שולח את העיר עם האסימון
            alert('City added successfully!');
            const response = await getAllCity();
            setList(response.data);
            setCityName(''); // מנקה את השדה
        } catch (error) {
            console.error("Full error:", error); // הדפסת השגיאה
            alert('Error creating city: ' + (error.response?.data?.error || error.message));
        }
    }
    
    return (
        <>
            <form onSubmit={(e) => newcity(e)}>
                <div className="cards">
                    <input
                        type="text"
                        placeholder="input name city"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn signup-btn">
                    Add city
                </button>
            </form>
        </>
    )
}
