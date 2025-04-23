import { useDispatch, useSelector } from "react-redux";
import { register } from "../api"
import swal from "sweetalert"
import { setCurrentAdvertiser, setToken } from "./store/Actions";
import { useNavigate } from "react-router";

export const Register = () => {
    const dispach = useDispatch()
    const navigate = useNavigate(); // יש להגדיר את ה-useNavigate בתוך הקומפוננטה

    const registerFunc = (event) => {
        event.preventDefault();
        const advertiser = {
            email: event.target[0].value,
            password: event.target[1].value,
            phon: event.target[2].value
        }
        register(advertiser)
            .then(s => {
                dispach(setCurrentAdvertiser(event))
                dispach(setToken(event))
                swal(`Hello!!!`,"נרשמת בהצלחה למערכת!!!!",)
                navigate(`/login`)
            })
            .catch(err=> {
                const errorMassage = err.response.data.error
                swal(`Oopps!`,errorMassage , 'error')
            })
    }
    return <>
        <div className="register-container">
            <h1 className="register-title">הירשם למערכת</h1>
            <form onSubmit={(e) => registerFunc(e)} className="register-form">
                <input id="email" type="email" placeholder="אימייל" className="input-field" required />
                <input id="password" type="password" placeholder="סיסמא" className="input-field" required />
                <input id="phon" type="tel" placeholder="טלפון" className="input-field" required />
                <input type="submit" value="הירשם" className="submit-btn" />
            </form>
        </div>
    </>
}
