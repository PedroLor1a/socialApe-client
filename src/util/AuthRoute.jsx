import { Route, redirect } from "react-router-dom";

const AuthRoute = ({ element: Element, authenticated, ...rest }) => {
  return (
    <Route {...rest} element={authenticated ? redirect("/") : <Element />} />
  );
};

export default AuthRoute;
