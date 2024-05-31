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

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", user);
      if (response.status !== 200) {
        throw new Error("아이디 or 비밀번호 오류");
      }

      setCookie("accessToken", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <form
        onSubmit={login}
        className="h-screen flex flex-col items-center justify-center"
      >
        <div className="bg-blue-100 rounded-sm p-8">
          <div className="py-4">
            <label className="px-2" htmlFor="username">
              아이디 :
            </label>
            <input
              className="px-2 rounded-md"
              type="text"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="py-4">
            <label className="px-2" htmlFor="password">
              비밀번호 :
            </label>
            <input
              className="px-2 rounded-md"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              onClick={() => {
                navigate("/");
              }}
              className="bg-blue-300 rounded-md p-4 mr-4"
            >
              목록
            </button>
            <button type="submit" className="bg-blue-300 rounded-md p-4 ml-4">
              로그인
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
