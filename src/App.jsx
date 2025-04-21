import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Landing from "./pages/Landing";
//import SignIn from "./pages/SignIn";
//import SignUp from "./pages/SignUp";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<Landing />} />
                    <Route path="/sign-up" element={<Landing />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
