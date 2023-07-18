import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../config/PrivateRoute";
import ChatPage from "./ChatPage";

import HomePage from "./HomePage";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AllRoutes;
