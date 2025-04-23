import { Provider } from "react-redux"
import myStore from "./store/State"
import { Nav } from "./Nav"
import { Routing } from "./Routing"
import { BrowserRouter } from "react-router-dom"

export const Main = () => {
    return <>
        <Provider store={myStore}>
            <BrowserRouter>
                <Nav></Nav>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>
    </>
}