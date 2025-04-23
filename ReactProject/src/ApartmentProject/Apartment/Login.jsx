

// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../api"
// import swal from "sweetalert"
// import { setCurrentAdvertiser, setToken } from "./store/Actions";
// import { useNavigate } from "react-router";
// export const Login = () => {
//     const navigate = useNavigate()
//     const dispach = useDispatch()
//     const userr = useSelector(s => s.currentAdvertiser)
//     const token = useSelector(s => s.token)
//     const loginFunc = (event) => {
//         event.preventDefault();
//         const advertiser = {
//             email: event.target[0].value,
//             password: event.target[1].value
//         }
//         login(advertiser)
//             .then(s => {
//                 dispach(setCurrentAdvertiser(s.data.advertiser))
//                 dispach(setToken(s.data.token))
//                 swal(`Hello`, 'התחברת בהצלחה!', 'success');
//                 navigate(`/home`);
//             })
//             .catch(
//                 err => {
//                     navigate(`/register`)
//                     const errorMessage = err.response.data.error;
//                     alert(errorMessage);
//                 }
//             )

//     }
//     return <>
//         <h1>Login </h1>
//         <form onSubmit={(e) => loginFunc(e)}>
//             <input id="email" type="email" placeholder="email"></input>
//             <br></br>
//             <input id="password" type="password" placeholder="password"></input>
//             <br></br>
//             <input type="submit" value="login" />
//         </form>
//     </>
// }
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api"
import swal from "sweetalert"
import { setCurrentAdvertiser, setToken } from "./store/Actions";
import { useNavigate } from "react-router";

export const Login = () => {
    const navigate = useNavigate()
    const dispach = useDispatch()
    const userr = useSelector(s => s.currentAdvertiser)
    const token = useSelector(s => s.token)
    
    const loginFunc = (event) => {
        event.preventDefault();
        const advertiser = {
            email: event.target[0].value,
            password: event.target[1].value
        }
        login(advertiser)
            .then(s => {
                dispach(setCurrentAdvertiser(s.data.advertiser))
                dispach(setToken(s.data.token))
                swal(`Hello`, 'התחברת בהצלחה!', 'success');
                navigate(`/apartment`);
            })
            .catch(
                err => {
                    navigate(`/register`)
                    const errorMessage = err.response.data.error;
                    alert(errorMessage);
                }
            )
    }
    return <>
        <div className="login-container">
            <h1 className="login-title">התחבר לחשבון שלך</h1>
            <form onSubmit={(e) => loginFunc(e)} className="login-form">
                <input id="email" type="email" placeholder="אימייל" className="input-field" required />
                <input id="password" type="password" placeholder="סיסמא" className="input-field" required />
                <input type="submit" value="התחבר" className="submit-btn" />
            </form>
        </div>
    </>
}
