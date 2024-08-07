import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import LoginForm from "./components/auth/login/LoginForm";
import HomePage from "./components/home/HomePage";
import Catalog from "../src/components/catalog/Catalog";
import Detail from "./components/detail/Detail";
import FavoriteList from "./components/favoriteList/FavoriteList";
import { UserProvider } from "./context/auth/UserContext";
import ProtectedLayout  from "./components/common/protectedRoutes/ProtectedLayout";
import {SearchInputProvider} from "./context/SearchInputContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <SearchInputProvider>
          <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<LoginForm />} />
          <Route element={<ProtectedLayout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/detail/:id" element={<Detail />} />
                  <Route path="/favorites" element={<FavoriteList />} />
                  <Route path="*" element={<HomePage />} />
          </Route >
          </Routes>
          </SearchInputProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
