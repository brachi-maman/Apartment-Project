import '../style.css';
import { useEffect, useState } from 'react';
import { getAllCategory } from "../api";
import { GetApartment } from './GetApartment';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from './store/Actions';

export const GetCategory = ({ forF }) => {
    const [list, setList] = useState([]);
    const [id, setId] = useState('');
    const categories = useSelector((store) => store.category);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.length > 0) {
            setList(categories);
        } else {
            getAllCategory()
                .then((res) => {
                    dispatch(setCategory(res.data));
                    setList(res.data);
                })
                .catch((err) => alert(err.message));
        }
    }, [categories, dispatch]);

    return (
        <>
            {list.length > 0 && (
                <div className="category-selector-container">
                    <select 
                        className="category-selector-dropdown"
                        onChange={(e) => { setId(e.target.value); }}
                    >
                        <option value="">בחר קטגוריה</option>
                        {list.map((x) => (
                            <option key={x._id} value={x._id}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {id && <GetApartment id={id} type="byCategory" />}
        </>
    );
};
