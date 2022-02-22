import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "fb";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FormError } from "../components/FormError";
import { useState } from "react";

interface IFormProps {
  email: string;
  password: string;
  result?: string;
}

const Auth = () => {
  const { register, handleSubmit, formState, clearErrors, setError } =
    useForm<IFormProps>();
  const [newAccount, setNewAccount] = useState(true);

  const onValid: SubmitHandler<IFormProps> = async ({ email, password }) => {
    let data: UserCredential;
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      // console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use": {
          return setError("result", { message: "이미 사용중인 이메일 입니다" });
        }
        case "auth/account-exists-with-different-credential": {
          return setError("result", { message: "다른 방식으로 로그인 하세요" });
        }
        case "auth/wrong-password": {
          return setError("result", { message: "비밀번호가 맞지 않습니다" });
        }
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const clearLoginError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  const socialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
      } else if (name === "github") {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
      }
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case "auth/popup-closed-by-user": {
          return setError("result", {
            message: "팝업창이 닫혔습니다. 다시 시도해주세요.",
          });
        }
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center mt-3 lg:mt-32">
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
        <div className="w-full text-2xl mt-8 text-gray-800 font-semibold text-center">
          팜 투 도어
        </div>
        <form
          className="grid gap-3 mt-5 w-full mb-3"
          onSubmit={handleSubmit(onValid)}
        >
          <div>
            <div className="text-left mb-3 text-md font-semibold">이메일</div>
            <input
              className="input"
              type="email"
              {...register("email", {
                required: "이메일 주소가 필요합니다",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일 주소 형식이 아닙니다",
                },
              })}
              onChange={clearLoginError}
              placeholder="이메일"
            />
          </div>
          <div>
            <div className="text-left mb-3 text-md font-semibold">비밀번호</div>
            <input
              className="input"
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "비밀번호는 6글자 이상입니다",
                },
              })}
              onChange={clearLoginError}
              placeholder="비밀번호"
              onSubmit={handleSubmit(onValid)}
            />
          </div>
          {formState.errors.password?.message && (
            <FormError errorMessage={formState.errors.password.message} />
          )}
          <button className="btn rounded-lg mt-10 mb-5 bg-blue-400 hover:bg-blue-600 text-white">
            {newAccount ? "회원 가입" : "로그인"}
          </button>
        </form>
        {formState.errors.result?.message && (
          <FormError errorMessage={formState.errors.result?.message} />
        )}
        <div className="cursor-pointer" onClick={toggleAccount}>
          {newAccount ? (
            <>
              <span>이미 가입하셨나요?</span>
              <span className="ml-2 text-blue-600">로그인 하기</span>
            </>
          ) : (
            <>
              <span>계정이 없으신가요?</span>
              <span className="ml-2 text-blue-600">회원가입 하기</span>
            </>
          )}
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <button
            className="btn rounded-lg mb-5 border border-gray-500 text-gray-500 hover:border-transparent hover:bg-gray-500 hover:text-white px-10"
            onClick={socialClick}
            name="google"
          >
            Continue with Google
          </button>
          <button
            className="btn rounded-lg border border-gray-500 text-gray-500 hover:border-transparent hover:bg-gray-500 hover:text-white px-10"
            onClick={socialClick}
            name="github"
          >
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
