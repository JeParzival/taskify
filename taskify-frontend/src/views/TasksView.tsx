import { useState } from "react";
import CompletedTaskItem from "../components/tasks/CompletedTask";
import TaskItem from "../components/tasks/Task";
import TaskCreator from "../components/tasks/TaskCreator";
import { TaskItemProps } from "../components/tasks/Types";

function Tasks() {
    let [tasks, setTasks] = useState([] as TaskItemProps[]);

    function pushItem(taskName: string, checked: boolean = false, expire?: Date) {
        tasks.push({ name: taskName, checked: checked, expireDate: expire });
        setTasks([...tasks]);
    }

    function completeItem(index: number) {
        console.log(1)
        tasks[index].checked = true;
        setTasks([...tasks]);
    }

    function removeItem(index: number) {
        console.log(2)
        tasks.splice(index, 1);
        setTasks([...tasks]);
    }

    return <section className="h-screen w-screen flex items-center justify-center bg-primary">
        <div className="relative flex flex-col w-[32rem] h-[40rem] rounded-[1.5625rem] bg-white shadow-xl p-4">
            <h1 className="w-full h-[4rem] text-[2rem] font-bold text-center">Tasks</h1>
            <div className="flex flex-col h-full overflow-hidden overflow-y-auto">
                <TaskCreator pushItem={pushItem} />
                {tasks.map((task, index) => {
                    if (task.checked) {
                        return <CompletedTaskItem key={index} name={task.name} checked={task.checked} removeItem={() => removeItem(index)} completeItem={() => completeItem(index)} />
                    } return <TaskItem key={index} name={task.name} checked={task.checked} removeItem={() => removeItem(index)} completeItem={() => completeItem(index)} />
                })}
            </div>
        </div>
    </section>
}

export default Tasks;
