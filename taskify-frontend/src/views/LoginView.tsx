import { useState } from "react";
import swal from "sweetalert";
import { useAuth } from "../components/auth";

function LoginView() {
  let [mailInput, setMailInput] = useState<string>("");
  let [passwordInput, setPasswordInput] = useState<string>("");

  let auth = useAuth();

  let PostResponse = (email: string, password: string) => auth.register(email, password);

  const MailInputHandler = (event: any) => {
    setMailInput(event.target.value)
  }
  const PasswordInputHandler = (event: any) => {
    setPasswordInput(event.target.value)
  }

  return (
    <section className="h-screen w-screen bg-primary flex items-center justify-center">
      <section className="flex flex-col p-4 rounded-xl bg-white shadow-lg w-[32rem]">
        <h1 className="mx-auto mb-2 text-xl font-bold tracking-wider text-title-1">
          Login
        </h1>
        <input
          placeholder="Your mail..."
          className="text-md mb-4 px-8 py-4 outline-none bg-primary rounded-xl"
          type="text"
          value={mailInput}
          onChange={MailInputHandler}
        />
        <input
          placeholder="Your password..."
          className="text-md mb-4 px-8 py-4 outline-none bg-primary rounded-xl"
          type="password"
          value={passwordInput}
          onChange={PasswordInputHandler}
        />
        <button className="ml-auto px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 font-medium tracking-wide text-white" onClick={async (e: any) => {
          e.preventDefault();
          if (!mailInput?.replaceAll(" ", "") || !passwordInput?.replaceAll(" ", "") || !mailInput || !passwordInput) return swal("Missing Parameter", "Please Fill All The Blanks", "error");
          else {
            try {
              let response = await PostResponse(mailInput, passwordInput)
              if ((response as any).status != 200) {
                return swal("Error", `Something Went Wrong - ${response.data}`, "error")
              }

              let data = response.data;

              window.localStorage.setItem("mail", data.email)
              window.localStorage.setItem("password", data.passwordHash)
            }
            catch (err: any) {
              swal("Error", "Something Went Wrong", "error")
            }
          }
        }}>
          Sign Up
        </button>
        <p className="text-sm text-gray-400">Do You Have Not Any Account? <a href="/register" className="hover:text-black text-gray-700">Sign Up</a></p>
      </section>
    </section>
  );
}

export default LoginView;
