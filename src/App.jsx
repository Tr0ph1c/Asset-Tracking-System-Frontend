import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
