import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";

import api from "../../utils/api";

interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
}

export default function Dashboard() {
  const [data, setData] = useState<User[]>([] as User[]);
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState<User>({} as User);

  useEffect(() => {
    async function getUsers() {
      await api.get("/users").then(({ data }) => {
        console.log(data);
        setData(data);
      });
      setUserLogged(JSON.parse(localStorage.getItem("token") || "{}"));
    }

    getUsers();
  }, []);

  return (
    <div className="container">
      <header
      // width="100%", align="center", justify="space-between", maigin-top="20px"
      className="d-flex justify-content-between align-items-center mt-3"
      >
        {/* 
        image of the user
      */}
      <div className="row">
        <div className="col-12">
          <Image
            src={userLogged.avatar}
            alt={userLogged.name}
            width={100}
            height={100}
            className="rounded-circle"
          />
        </div>
      </div>
      {/* 
        logout button
      */}
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              Router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      </header>

      <h1 className="display-6">Dashboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user: any) => (
            <tr key={user.id}>
              <th scope="row">{user._id}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
