import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function Footer() {
  const { user } = useContext(GlobalContext);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Footer</h1>
      <h3>User: {user.username}</h3>
    </div>
  );
}
