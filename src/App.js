import React from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
