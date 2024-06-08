import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  children?: any;
  to?: any;
}

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/home">SiteName</Link>
      <ul>
        {!user && (
          <>
            <CustomLink to="/signin">Sign In</CustomLink>
            <CustomLink to="/signup">Sign Up</CustomLink>
          </>
        )}
        {user && user.roles.includes("Student") && (
          <CustomLink to="/student-dashboard">S-Dasboard</CustomLink>
        )}
        {user && user.roles.includes("Professor") && (
          <CustomLink to="/professor-dashboard">P-Dasboard</CustomLink>
        )}
        {user && user.roles.includes("Admin") && (
          <CustomLink to="/admin-dashboard">A-Dasboard</CustomLink>
        )}
        {user && (
          <>
            <CustomLink to="/my-account">Profile</CustomLink>
            <CustomLink to="/universities">Universities</CustomLink>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }: Props) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
