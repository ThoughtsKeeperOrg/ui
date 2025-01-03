import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Thoughts from "./pages/Thoughts";
import ThoughtsAssociations from "./pages/ThoughtsAssociations";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Thoughts />} />
          <Route path="/thoughts/:id/associations" element={<ThoughtsAssociations />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}