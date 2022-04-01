type TeamCardProps = {
    name: string,
    members: string[],
    completedTasksAverage: number
};

function TeamCard({ name, members, completedTasksAverage }: TeamCardProps) {
    return <div className="flex items-center bg-primary shadow h-20 rounded-[1.5rem] p-2">
        <img className="w-16 h-16 rounded-[1.5rem] mr-2" src="/assets/pp.jpg" alt="" />
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <h1 className="text-title-2 font-bold truncate w-32 text-nowrap">{name}</h1>
                <div className="flex items-center justify-center bg-[#48FFBD] rounded-[1.5rem] ml-2 w-10 h-4 font-bold text-[0.75rem] text-white">%75</div>
            </div>
            <div className="flex h-6">
                {new Array(6).fill(0).map(member => <img className="w-6 h-6 rounded-full first:-ml-0 -ml-3" src="/assets/pp.jpg" alt="" />)}
                <div className="-ml-3 rounded-full w-6 h-6 bg-[#CC61FE] flex items-center justify-center text-white text-[0.625rem] font-bold">
                    +10
                </div>
            </div>
        </div>
    </div>
}

function TeamsView() {
    let teams = [] as TeamCardProps[];

    return <section className="h-screen w-screen flex items-center justify-center bg-primary">
        <div className="w-[64rem] max-h-[32rem] rounded shadow-lg bg-white rounded-2xl p-4">
            <h1 className="text-center mb-4 font-bold text-2xl text-title-1">My Teams</h1>
            <div className="grid gap-4 grid-rows-3 grid-cols-3 ">
                {new Array(7).fill(0).map(team => <TeamCard name={"Alosha ve arkadaşları"} members={[]} completedTasksAverage={100} />)}
            </div>
            <div className="flex justify-center w-full mt-8">
                <button className="text-white mx-auto px-8 py-4 rounded-[1.5rem] font-bold text-[1.25rem] bg-[#CC61FE] hover:bg-opacity-80 transition">Create Team</button>
            </div>
        </div>
    </section>
}

export default TeamsView;
