import { Link, useLocation } from "react-router-dom";
import { routes } from "routes";

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="h-20 ">
      <ul className="container flex justify-center items-center h-full">
        <li>
          <Link to={routes.home} className="hover:font-semibold">
            <div
              className={`border-b-4 border-transparent px-3 py-2 mr-20 ${
                pathname === routes.home && "border-blue-400"
              }`}
            >
              홈
            </div>
          </Link>
        </li>
        <li>
          <Link to={routes.profile} className="hover:font-semibold">
            <div
              className={`border-b-4 border-transparent px-3 py-2 ${
                pathname === routes.profile && "border-blue-400"
              }`}
            >
              프로필
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
