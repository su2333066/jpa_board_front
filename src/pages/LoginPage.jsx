import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (!username) {
      return alert("아이디를 입력하세요");
    } else if (!password) {
      return alert("비밀번호를 입력하세요");
    }

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    await axios
      .post("/api/login", formData)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {});
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
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="py-4">
            <label className="px-2" htmlFor="password">
              비밀번호 :
            </label>
            <input
              className="px-2 rounded-md"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
