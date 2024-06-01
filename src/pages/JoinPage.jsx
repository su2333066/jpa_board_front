import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    nickname: "",
  });
  const [validUsername, setValidUsername] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [validNickname, setValidNickname] = useState("");
  const [duplicateUsername, setDuplicateUsername] = useState(true);
  const [duplicateNickname, setDuplicateNickname] = useState(true);

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const join = async () => {
    if (!user.username || !user.nickname) {
      alert("아이디와 닉네임은 필수 입력 값입니다.");
      return;
    }

    if (duplicateUsername) {
      alert("아이디 중복체크 부탁드립니다.");
      return;
    }

    if (duplicateNickname) {
      alert("닉네임 중복체크 부탁드립니다.");
      return;
    }

    let flag = true;

    setValidPassword("");

    const response = await axios.post("/api/auth/join/check", user);
    if (!response.data.ok) {
      for (const key of Object.keys(response.data.validatorResult)) {
        if (key === "valid_password") {
          setValidPassword(response.data.validatorResult.valid_password);
          flag = false;
        }
      }
    }

    if (flag) {
      await axios.post("/api/auth/join", user).then((res) => {
        if (res.data) {
          alert("회원가입 성공!!");
          navigate("/");
        } else {
          console.log(res.data);
          alert("회원가입 실패!!");
        }
      });
    }
  };

  const duplicateUsernameCheck = async () => {
    let flag = true;

    setValidUsername("");

    const response = await axios.post("/api/auth/join/check", user);
    if (!response.data.ok) {
      for (const key of Object.keys(response.data.validatorResult)) {
        if (key === "valid_username") {
          setValidUsername(response.data.validatorResult.valid_username);
          flag = false;
        }
      }
    }

    if (flag) {
      try {
        const response = await axios.get(
          `/api/auth/join/username/${user.username}`
        );
        alert(response.data);
        setDuplicateUsername(false);
      } catch (e) {
        alert(e.response.data);
        setDuplicateUsername(true);
      }
    }
  };

  const duplicateNicknameCheck = async () => {
    let flag = true;

    setValidNickname("");

    const response = await axios.post("/api/auth/join/check", user);
    if (!response.data.ok) {
      for (const key of Object.keys(response.data.validatorResult)) {
        if (key === "valid_nickname") {
          setValidNickname(response.data.validatorResult.valid_nickname);
          flag = false;
        }
      }
    }

    if (flag) {
      try {
        const response = await axios.get(
          `/api/auth/join/nickname/${user.nickname}`
        );
        alert(response.data);
        setDuplicateNickname(false);
      } catch (e) {
        alert(e.response.data);
        setDuplicateNickname(true);
      }
    }
  };

  useEffect(() => {
    setDuplicateUsername(true);
  }, [user.username]);

  useEffect(() => {
    setDuplicateNickname(true);
  }, [user.nickname]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-100 rounded-sm p-8 w-1/2">
        <div className="py-4 relative ">
          <label className="px-2" htmlFor="username">
            아이디 :
          </label>
          <input
            className="px-2 rounded-md"
            type="text"
            id="username"
            onChange={handleChange}
          />
          <p className="w-full h-2 p-2 text-red-500">{validUsername}</p>
          <button
            onClick={duplicateUsernameCheck}
            className="absolute right-0 top-3 bg-blue-400 p-1 mr-2 rounded-md"
          >
            중복체크
          </button>
        </div>

        <div className="py-4 relative">
          <label className="px-2" htmlFor="nickname">
            닉네임 :
          </label>
          <input
            className="px-2 rounded-md"
            type="text"
            id="nickname"
            onChange={handleChange}
          />
          <p className="w-full h-2 p-2 text-red-500">{validNickname}</p>
          <button
            onClick={duplicateNicknameCheck}
            className="absolute right-0 top-3 bg-blue-400 p-1 mr-2 rounded-md"
          >
            중복체크
          </button>
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
          <p className="w-full h-2 p-2 text-red-500">{validPassword}</p>
        </div>

        <div className="flex justify-center p-4">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-blue-300 rounded-md p-4 mr-4"
          >
            목록
          </button>
          <button onClick={join} className="bg-blue-300 rounded-md p-4 ml-4">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
