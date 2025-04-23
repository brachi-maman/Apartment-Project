
import '../style.css';
import { useEffect, useState } from 'react';
import { getAllCity } from "../api";
import { GetApartment } from './GetApartment';
import { useDispatch, useSelector } from 'react-redux';
import { setCity } from './store/Actions';

export const GetCity = ({ forF }) => {
    const [list, setList] = useState([]);
    const [id, setId] = useState();
    const cities = useSelector((store) => store.city);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cities.length > 0) {
            setList(cities);
        } 
        else {
            getAllCity()
                .then((res) => {
                    dispatch(setCity(res.data));
                    setList(res.data);
                })
                .catch((err) => alert(err.message));
        }
    }, [cities, dispatch]);

    return (
        <>
            {list.length > 0 && (
                <div className="city-selector-container">
                    <select 
                        className="city-selector-dropdown"
                        onChange={(e) => { setId(e.target.value); }}
                    >
                        <option value="">בחר עיר</option>
                        {list.map((x) => (
                            <option key={x._id} value={x._id}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {id && <GetApartment id={id} type="byCity" />}
        </>
    );
};
