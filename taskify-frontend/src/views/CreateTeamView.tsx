function CreateTeamView() {
    return <section className="h-screen w-screen bg-primary flex items-center justify-center">
        <section className="flex flex-col p-4 rounded-xl bg-white shadow-lg w-[32rem]">
            <h1 className="mx-auto mb-2 text-xl font-bold tracking-wider text-title-1">Create Team</h1>
            <input placeholder="Your team name..." className="text-md mb-4 px-8 py-4 outline-none bg-primary rounded-xl" type="text" />
            <button className="ml-auto px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 font-medium tracking-wide text-white">Create Team</button>
        </section>
    </section>
}

export default CreateTeamView;
