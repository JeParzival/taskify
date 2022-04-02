import { Link } from 'react-router-dom';
import { useEffect, useState } from "react"

function AbsoluteButton({ name, icon, customClass, path }: { name: string, icon: string, customClass: string, path: string }) {
    return <Link to={path}><button className={'absolute flex items-center justify-center hover:bg-opacity-80 font-bold w-[9.5rem] h-[3rem] rounded-xl shadow transition ' + customClass}>
        <span className="ml-2 iconify text-title-2" data-icon={icon} data-width="32" data-height="32"></span>
        <span className="w-[7.375rem] h-[3rem] flex items-center justify-center text-white">{name}</span>
    </button></Link>
}

function ProfileView() {
    let [name, setName] = useState<string>()
    let [featuredTitle, setFeaturedTitle] = useState<string>()
    let [title, setTitle] = useState<string>()

    return (
        <section className="bg-primary h-screen w-screen flex items-center justify-center">
            <div className="relative w-[16rem] h-[16rem] bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center">
                <div className="relative flex flex-col items-center">
                    <img className="w-[8rem] h-[8rem] rounded-full shadow" src="/assets/pp.jpg" />
                    <div style={{ background: 'linear-gradient(90deg, rgba(204,0,255,1) 0%, rgba(235,0,127,1) 100%)' }} className="-mb-2 flex items-center justify-center absolute rounded-full bottom-0 text-center w-[5.125rem] h-[2rem] font-bold text-white text-[1rem]">{title || "Coolboy"}</div>
                </div>
                <h1 className="text-center mt-2 w-[12.375rem] h-[2.125rem] font-bold text-[32px] text-title-1">{name || "User"}</h1>
                <h2 className="w-[8rem] h-[2.125rem] text-title-2 text-opacity-50 font-bold text-base  flex items-center justify-center mt-2">{featuredTitle || "Alosha ve arks"}</h2>
                <AbsoluteButton path='/settings' name="Settings" icon="ci:settings-filled" customClass="-right-32 bottom-10 bg-[#B8ACFF]" ></AbsoluteButton>
                <AbsoluteButton path='/createteam' name="Create Team" icon="fluent:people-team-add-20-filled" customClass="-right-24 mt-[2rem] top-0 bg-[#8FE25B]" />
                <AbsoluteButton path='/teams' name="My Teams" icon="fluent:people-team-32-filled" customClass="-left-24 -top-5 bg-[#42E9AD]" />
                <AbsoluteButton path='/tasks' name="My Tasks" icon="fluent:clipboard-task-list-ltr-24-filled" customClass="-left-32 bottom-24 bg-[#E4AE7C]" />
                <div className="-bottom-20 -left- absolute w-[4rem] h-[4rem] flex items-center justify-center rounded-[1.5625rem] bg-title-1 cursor-pointer hover:bg-opacity-80 transition">
                    <a href="https://github.com/aloshai/taskify">
                        <span className="iconify text-white" data-icon="akar-icons:github-fill" data-width="32" data-height="32"></span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default ProfileView;
