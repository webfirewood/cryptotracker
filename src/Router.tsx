import {BrowserRouter, Route, Routes} from "react-router-dom";
import Coins from "./routes/Conins";
import Coin from "./routes/Coin";

function Router() {
    return <BrowserRouter basename="/cryptotracker">
        <Routes>
            <Route path="/" element={<Coins />}/>
            <Route path="/:coinId/*" element={<Coin />}/>
        </Routes>
    </BrowserRouter>
}

export default Router;