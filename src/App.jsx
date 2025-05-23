import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Asset from "./pages/Asset";
import History from "./pages/History";

import { Toaster } from "@/components/ui/toaster"


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/manager-home" element={<Dashboard />}>
                        <Route path="" element={<Home />} />
                        <Route path="add" element={<Asset />} />
                        <Route path="staff" element={<Staff />} />
                        <Route path="history" element={<History />} />
                    </Route>
                </Routes>
            </Router>

            <Toaster />

        </>
    );
}

export default App;
