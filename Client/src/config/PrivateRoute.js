const { Navigate } = require("react-router-dom");

function PrivateRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return <Navigate to="/" />;
  }
  return children;
}
export default PrivateRoute;
