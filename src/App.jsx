import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import LearnMore from "./pages/LearnMore";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Staff from "./pages/Staff";

import { Toaster } from "@/components/ui/toaster"


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/learn-more" element={<LearnMore />} />
                    <Route path="/manager-home" element={<Dashboard />}>
                        <Route path="" element={<Home />}/>
                        <Route path="add" element={<Home />}/>
                        <Route path="staff" element={<Staff />}/>
                    </Route>
                </Routes>
            </Router>
            
            <Toaster />
            
        </>
    );
}

export default App;
