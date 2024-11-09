import { Link, Outlet, useLocation } from "react-router-dom";

const HomePage = function () {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === "/" && (
        <div className="links">
          <div>
            <h1>Post App</h1>
          </div>
          <div>
            <Link className="links" to="/login">Login</Link>
            <Link className="links" to="/signup">Signup</Link>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default HomePage;
