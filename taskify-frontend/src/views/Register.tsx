import axios from "axios";
import { DEFAULTS } from "../lib/config";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import sha256 from "sha256";
function Register(){
  let [mail, setMail] = useState<string>();
  let [passwordInput, setPass] = useState<string>();
  let Post:any = (email: string, password: string) => {
    axios.create({ baseURL: DEFAULTS.SERVER_ENDPOINT });
    axios.post("/register", {
      data: {
        email: email,
        passwordHash: sha256(password),
      },
      
    }).then(response => {
        return response
    })
  }
  let MailHandler = (event:any) => {
      setMail(event.target.value)
  } 
  let PassHandler = (event:any) => {
    setPass(event.target.value)
}
  return (
    <section className="h-screen w-screen bg-primary flex items-center justify-center">
      <section className="flex flex-col p-4 rounded-xl bg-white shadow-lg w-[32rem]">
        <h1 className="mx-auto mb-2 text-xl font-bold tracking-wider text-title-1">
          Register
        </h1>
        <input
          placeholder="Your mail..."
          className="text-md mb-4 px-8 py-4 outline-none bg-primary rounded-xl"
          type="text"
          value={mail}
          onChange={MailHandler}
        />
        <input
          placeholder="Your password..."
          className="text-md mb-4 px-8 py-4 outline-none bg-primary rounded-xl"
          type="text"
          value={passwordInput}
          onChange={PassHandler}
        />
        <button className="ml-auto px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 font-medium tracking-wide text-white" onClick={async(e:any) => {
            e.preventDefault();
            if(!mail?.replaceAll(" ", "") || !passwordInput?.replaceAll(" ","") || !mail || !passwordInput) return swal("Missing Parameter", "Please Fill All The Blanks", "error");
            else {

               try {
                let response = await Post(mail,passwordInput)
                if((response as any).status != 200) {
                    return swal("Error", "Something Went Wrong", "error")
                }
                window.localStorage.setItem("mail", response.email)
                window.localStorage.setItem("password", response.passwordHash)
                window.localStorage.setItem("settings", JSON.stringify(response.settings))
            }
            catch(err:any){
                 swal("Error","Something Went Wrong", "error")
                }
                }
            
        }}>
          Sign Up
        </button>
        <p className="text-sm text-gray-400">Do You Have Already An Account? <a href="/login" className="hover:text-black text-gray-700">Sign In</a></p>
      </section>
    </section>
  );
}

export default Register;
