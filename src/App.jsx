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

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Quizes />,
        },
        {
          path: "/insertQuizes",
          element: <InsertQuizes />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
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
