import { useEffect, useState } from "react";
import { getAllApartments, getAllCategory, getAllCity } from "../api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetCity } from "./ByCity";
import { GetCategory } from "./ByCategory";
import { GetApartment } from "./GetApartment";
import { setApartmentStore } from "./store/Actions";

export const Apartment = () => {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [citys, setCities] = useState([]);
    const [selectType, setSelectType] = useState("selectAll");
    const [select, setSelect] = useState();
    const [inputValue, setInputValue] = useState("");
    const currentAdvertiser = useSelector(state => state.currentAdvertiser);
    const [listA, setListA] = useState();

    useEffect(() => {
        getAllApartments()
            .then((x) => setList(x.data))
            .catch((err) => alert(err.massage));

        getAllCategory()
            .then((x) => setCategories(x.data))
            .catch((err) => alert(err.massage));

        getAllCity()
            .then((x) => setCities(x.data))
            .catch((err) => alert(err.massage));
    }, []);

    return (
        <div className="apartment-container">

            <div className="filter-controls">
                <button className="select-button" onClick={(e) => setSelect(true)}>Select</button>
                {select && (
                    <select className="filter-dropdown" onChange={(e) => setSelectType(e.target.value)}>
                        <option value="selectAll">selectAll</option>
                        <option value="byCategory">byCategory</option>
                        <option value="getAllyourApartment">getAllyourApartment</option>
                        <option value="byCity">byCity</option>
                        <option value="byId">byId</option>
                        <option value="getBybigbed">getBybigbed</option>
                        <option value="getBySmallbed">getBySmallbed</option>
                        <option value="getByBigPrice">getByBigPrice</option>
                        <option value="getBySmallprice">getBySmallprice</option>
                    </select>
                )}
            </div>

            <div className="results-container">
                {selectType === "selectAll" && <GetApartment className="apartment-result" type={"getAll"} />}
                {selectType === "byCategory" && <GetCategory className="apartment-result" type={"byCategory"} />}
                {selectType === "getAllyourApartment" && (
                    <GetApartment
                        className="apartment-result"
                        id={currentAdvertiser._id}
                        type={"getAllyourApartment"}
                    />
                )}
                {selectType === "byCity" && <GetCity className="filter-dropdown" type="byCity" />}
                {selectType === "byId" && (
                    <input
                        className="filter-input"
                        type="number"
                        onBlur={(e) => setInputValue(e.target.value)}
                    />
                )}
                {selectType === "byId" && inputValue && (
                    <GetApartment
                        className="apartment-result"
                        id={inputValue}
                        type={"byId"}
                    />
                )}
                {selectType === "getBybigbed" && (
                    <input
                        className="filter-input"
                        type="text"
                        onBlur={(e) => setInputValue(e.target.value)}
                    />
                )}
                {selectType === "getBybigbed" && inputValue && (
                    <GetApartment
                        className="apartment-result"
                        id={inputValue}
                        type={"getBybigbed"}
                    />
                )}
                {selectType === "getBySmallbed" && (
                    <input
                        className="filter-input"
                        type="number"
                        onBlur={(e) => setInputValue(e.target.value)}
                    />
                )}
                {selectType === "getBySmallbed" && inputValue && (
                    <GetApartment
                        className="apartment-result"
                        id={inputValue}
                        type={"getBySmallbed"}
                    />
                )}
                {selectType === "getBySmallprice" && (
                    <input
                        className="filter-input"
                        type="number"
                        onBlur={(e) => setInputValue(e.target.value)}
                    />
                )}
                {selectType === "getBySmallprice" && inputValue && (
                    <GetApartment
                        className="apartment-result"
                        id={inputValue}
                        type={"getBySmallprice"}
                    />
                )}
                {selectType === "getByBigPrice" && (
                    <input
                        className="filter-input"
                        type="number"
                        onBlur={(e) => setInputValue(e.target.value)}
                    />
                )}
                {selectType === "getByBigPrice" && inputValue && (
                    <GetApartment
                        className="apartment-result"
                        id={inputValue}
                        type={"getByBigPrice"}
                    />
                )}
                {listA && (
                    <GetApartment
                        className="apartment-result"
                        id={currentAdvertiser._id}
                        type="getAllyourApartment"
                    ></GetApartment>
                )}
            </div>
        </div>
    );
};
