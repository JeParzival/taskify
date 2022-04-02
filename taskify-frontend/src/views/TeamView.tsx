import CompletedTaskItem from "../components/tasks/CompletedTask";
import TaskItem from "../components/tasks/Task";

function TeamView() {
    return <section className="h-screen w-screen flex items-center justify-center bg-primary">
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="flex w-[32rem] h-32 rounded-[1.5rem] p-4 bg-white shadow-lg mb-12">
                    <img className="w-24 h-24 rounded-[1.5rem] mr-2" src="/assets/pp.jpg" alt="" />
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center mb-2">
                            <h1 className="text-title-2 font-bold truncate w-64 text-nowrap text-3xl">Alosha ve arkadaşları</h1>
                            <div className="flex items-center justify-center bg-[#48FFBD] rounded-[1.5rem] ml-2 w-10 h-4 font-bold text-[0.75rem] text-white">%75</div>
                        </div>
                        <div className="flex h-6">
                            {new Array(6).fill(0).map(member => <img className="w-6 h-6 rounded-full first:-ml-0 -ml-2" src="/assets/pp.jpg" alt="" />)}
                            <div className="-ml-2 rounded-full w-6 h-6 bg-[#CC61FE] flex items-center justify-center text-white text-[0.625rem] font-bold">
                                +10
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center w-[32rem] h-[32rem] rounded-[1.5rem] p-4 bg-white shadow-lg">
                    <h1 className="w-full h-[4rem] text-[2rem] font-bold text-center text-title-2">Your Tasks</h1>
                    <div className="flex flex-col w-full h-full overflow-hidden">
                        {new Array(9).fill({ name: "DSADASD", checked: false }).map((task, index) => {
                            if (task.checked) {
                                return <CompletedTaskItem key={index} name={task.name} checked={task.checked} removeItem={console.log} completeItem={console.log} />
                            } return <TaskItem key={index} name={task.name} checked={task.checked} removeItem={console.log} completeItem={console.log} />
                        })}
                    </div>
                </div>
            </div>
            <div className="ml-12 flex flex-col items-center w-[32rem] rounded-[1.5rem] p-4 bg-white shadow-lg">
                <h1 className="w-full h-[4rem] text-[2rem] font-bold text-center text-title-2">Global Tasks</h1>
                <div className="flex flex-col w-full h-full overflow-hidden">
                    {new Array(9).fill({ name: "DSADASD", checked: false }).map((task, index) => {
                        if (task.checked) {
                            return <CompletedTaskItem key={index} name={task.name} checked={task.checked} removeItem={console.log} completeItem={console.log} />
                        } return <TaskItem key={index} name={task.name} checked={task.checked} removeItem={console.log} completeItem={console.log} />
                    })}
                </div>
            </div>
        </div>
    </section>
}

export default TeamView;
