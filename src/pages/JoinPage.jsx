import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState("");
  const [duplicateUsername, setDuplicateUsername] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [validNickname, setValidNickname] = useState("");
  const [duplicateNickname, setDuplicateNickname] = useState(true);

  const duplicateUsernameCheck = async () => {
    if (!username) {
      alert("아이디와 닉네임은 필수 입력 값입니다.");
      return;
    }

    await axios.get(`/api/auth/join/username/${username}`).then((res) => {
      if (!res.data) {
        alert("사용 가능한 아이디입니다.");
        setDuplicateUsername(false);
      } else {
        alert("중복된 아이디입니다.");
      }
    });
  };

  const duplicateNicknameCheck = async () => {
    if (!username) {
      alert("아이디와 닉네임은 필수 입력 값입니다.");
      return;
    }

    await axios.get(`/api/auth/join/nickname/${nickname}`).then((res) => {
      if (!res.data) {
        alert("사용 가능한 닉네임입니다.");
        setDuplicateNickname(false);
      } else {
        alert("중복된 닉네임입니다.");
      }
    });
  };

  const join = async (e) => {
    e.preventDefault();

    if (!username || !nickname) {
      alert("아이디와 닉네임은 필수 입력 값입니다.");
      return;
    }

    if (duplicateUsername || duplicateNickname) {
      alert("중복체크는 필수입니다.");
    }

    await axios
      .post("/api/auth/join", {
        username: username,
        password: password,
        nickname: nickname,
      })
      .then((res) => {
        console.log(res);

        if (res.data.msg === "fail") {
          setValidUsername("");
          setValidPassword("");
          setValidNickname("");
          for (const key of Object.keys(res.data.validatorResult)) {
            if (key === "valid_username") {
              setValidUsername(res.data.validatorResult.valid_username);
            } else if (key === "valid_password") {
              setValidPassword(res.data.validatorResult.valid_password);
            } else {
              setValidNickname(res.data.validatorResult.valid_nickname);
            }
          }
        } else {
          alert("회원가입 성공!!");
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <form
        onSubmit={join}
        className="h-screen flex flex-col items-center justify-center"
      >
        <div className="bg-blue-100 rounded-sm p-8 w-1/2">
          <div className="py-4 relative ">
            <label className="px-2" htmlFor="username">
              아이디 :
            </label>
            <input
              className="px-2 rounded-md"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <p className="px-2 text-red-500">{validUsername}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                duplicateUsernameCheck();
              }}
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
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <p className="px-2 text-red-500">{validNickname}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                duplicateNicknameCheck();
              }}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="px-2 text-red-500">{validPassword}</p>
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
            <button type="submit" className="bg-blue-300 rounded-md p-4 ml-4">
              회원가입
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
