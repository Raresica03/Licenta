import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface Props {
    children? : any,
    to?: any,
}

export default function Navbar() {
  return (
    <nav>
      <Link to="/home">SiteName</Link>
      <ul>
        <CustomLink to="/signin">Sign In</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>
        <CustomLink to="/my-account">Profile</CustomLink>
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
