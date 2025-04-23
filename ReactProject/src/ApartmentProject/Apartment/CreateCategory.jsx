
import { useEffect, useState } from 'react';
import '../style.css';
import { createCategory, createCity, getAllCategory, getAllCity } from '../api';
import { CardCity } from './Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const CreateCategory = () => {
    const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const token = useSelector((state) => state.token); // אם האסימון שמור ב-Redux
    const navigate = useNavigate(); // יש להגדיר את ה-useNavigate בתוך הקומפוננטה

    useEffect(() => {
        getAllCategory()
            .then((x) => {
                setList(x.data);
            })
            .catch((err) => alert(err + ' חבל'));
    }, []);

    const newcategory = async (event) => {
        event.preventDefault();
        const category = {
        name:categoryName,
        };
    
        try {
            await createCategory(category, token); // שולח את העיר עם האסימון
            alert('Category added successfully!');
            const response = await getAllCategory();
            setList(response.data);
            navigate(`/apartment`)
            setCategoryName(''); // מנקה את השדה
        } catch (error) {
            console.error("Full error:", error); // הדפסת השגיאה
            alert('Error creating category: ' + (error.response?.data?.error || error.message));
        }
    }
    
    return (
        <>
            <form onSubmit={(e) => newcategory(e)}>
                <div className="cards">
                    <input
                        type="text"
                        placeholder="input name category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn signup-btn">
                    Add Category
                </button>
            </form>
        </>
    )
}
