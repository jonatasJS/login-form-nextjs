import type { AppProps } from "next/app";
import Router from "next/router";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import api from "../utils/api";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function verifyUser() {
      const user = JSON.parse(localStorage.getItem("token") || "{}");

      // verificar se o _id do localStorage é igual ao _id na api
      api.get("/users").then(({ data }) => {
        const userApi = data.find((userApi: any) => userApi._id === user._id);

        if (!userApi) return Router.push("/");

        if(Router.pathname != "/dashboard") return Router.push("/dashboard");
      });
    }

    verifyUser();
  }, []);

  return <Component {...pageProps} />;
}
