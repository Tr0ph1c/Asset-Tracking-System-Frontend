import NavBar from "./NavBar"
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <>
        <NavBar />

        <Outlet />
    </>
  )
}

export default Dashboard