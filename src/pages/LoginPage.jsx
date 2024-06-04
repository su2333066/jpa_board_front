import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../common/Cookie";

export default function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const login = async () => {
    try {
      const response = await axios.post("/api/auth/login", user);
      setCookie("accessToken", response.data);

      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <main>
      <fieldset>
        <input
          type="text"
          placeholder="아이디"
          id="username"
          onChange={handleChange}
        />
      </fieldset>
      <fieldset>
        <input
          type="password"
          placeholder="비밀번호"
          id="password"
          onChange={handleChange}
        />
      </fieldset>
      <fieldset>
        <button onClick={login}>로그인</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          목록
        </button>
      </fieldset>
    </main>
  );
}
