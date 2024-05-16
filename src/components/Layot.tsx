import { Outlet } from "react-router-dom";
import { Header } from "./header/header";

const Layot = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layot;
