import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";

const PublicRoute = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return <>{isLogin ? <Navigate to="/" /> : <Outlet />}</>;
};
const PrivateRoute = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
