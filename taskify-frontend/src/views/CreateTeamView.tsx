import { useEffect, useState } from "react"
import axios from "axios"
import { DEFAULTS } from "../lib/config"
import swal from "sweetalert"
function CreateTeamView() {
    let [windower,setWindow] = useState<typeof window>()
    let [name, setName] = useState<string>()
    function Post(name:string){
        axios.create({ baseURL: DEFAULTS.SERVER_ENDPOINT });
        axios.post("/team", {
            data: {
                name,
                icon: "https://cdn.discordapp.com/attachments/959499213815832676/959532714061615104/unknown.png"
            }
        }).then(response => {
            return response
        })
    }
    useEffect(() => {
        if (window && typeof window != "undefined") {
            setWindow(window);
            if (!window.localStorage.getItem("mail") || !window.localStorage.getItem("password")) {
                window.location.href = "/register"
                return
            }
        }
    })

    return <section className="h-screen w-screen bg-primary flex items-center justify-center">
        <section className="flex flex-col p-4 rounded-xl bg-white shadow-lg w-[32rem]">
            <h1 className="mx-auto mb-2 text-xl font-bold tracking-wider text-title-1">Create Team</h1>
            <input placeholder="Your team name..." className="text-md mb-4 px-8 py-4 outline-none bg-primary rounded-xl" type="text" />
            <button className="ml-auto px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 font-medium tracking-wide text-white" onClick={async(e:any) => {
                e.preventDefault();
                if(!name?.replaceAll(" ", "") || !name) return swal("Missing Parameter", "Please Fill All The Blanks", "error");
                else {
                    try {
                        let response = await Post(name)
                        if((response as any).status != 200) {
                            return swal("Error", "Something Went Wrong", "error")
                        }
                    } catch (error) {
                        return swal("Error", "Something Went Wrong", "error")
                    }
                }
            }}>Create Team</button>
        </section>
    </section>
}

export default CreateTeamView;

