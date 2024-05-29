import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");

  const join = async (e) => {
    e.preventDefault();
    if (!username) {
      return alert("아이디를 입력하세요");
    } else if (!password) {
      return alert("비밀번호를 입력하세요");
    }

    await axios
      .post("/api/join", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setValidUsername("");
        setValidPassword("");
        if (res.data.msg === "validateError") {
          for (const key of Object.keys(res.data.validatorResult)) {
            if (key === "valid_username") {
              setValidUsername(res.data.validatorResult.valid_username);
            } else {
              setValidPassword(res.data.validatorResult.valid_password);
            }
          }
        } else if (res.data.msg === "duplicateError") {
          alert("중복된 아이디입니다");
        } else {
          alert("회원가입 성공!!");
          navigate("/");
        }
      })
      .catch(() => {});
  };

  return (
    <>
      <form
        onSubmit={join}
        className="h-screen flex flex-col items-center justify-center"
      >
        <div className="bg-blue-100 rounded-sm p-8 w-1/2">
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
            <p className="px-2 text-red-500">{validUsername}</p>
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
            <p className="px-2 text-red-500">{validPassword}</p>
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
              회원가입
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
