import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "./Components/Home";
import InsertQuizes from "./Components/InsertQuizes";
import Error from "./Components/Error";
import { RouterProvider } from "react-router-dom";
import Quizes from "./Components/Quizes";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import UserHome from "./Components/UserComponents/UserHome";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <UserHome />,
    },
    {
      path: "/admin",
      element: <Home />,
      children: [
        {
          path: "/admin",
          element: <Quizes />,
        },
        {
          path: "/admin/insertQuizes",
          element: <InsertQuizes />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <Login />,
    },
    {
      path: "/admin/signUp",
      element: <Signup />,
    },
    {
      errorElement: <Error />,
    },
  ]);
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;
