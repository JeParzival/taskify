import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import CompletedTaskItem from "../components/tasks/ComplatedTask";
import TaskItem from "../components/tasks/Task";
import TaskCreator from "../components/tasks/TaskCreator";
import { TaskItemProps } from "../components/tasks/Types";

import ApiInstance from "../lib/api";

function Tasks() {
    let [loading, setLoading] = useState(true);
    let [tasks, setTasks] = useState([] as TaskItemProps[]);

    let user = useAuth();

    useEffect(() => {
        if (loading) {
            ApiInstance.get("/user/tasks", {
                auth: {
                    username: user.user.email,
                    password: user.user.password
                }
            }).then((response) => {
                if (response.status == 200) {
                    setLoading(false);
                    setTasks(response.data);
                }
            });
        }
    }, [tasks]);

    function CreateNewTask(taskName: string, complated: boolean = false, expire?: Date) {
        const task = {
            content: taskName,
            complated: complated,
            expiresAt: expire
        };

        ApiInstance.post("/user/tasks", {
            ...task
        }, {
            auth: {
                username: user.user.email,
                password: user.user.password
            }
        }).then((response) => {
            if (response.status == 201) {
                setTasks(response.data);
            }
        })
    }

    function ComplateTask(index: number) {
        let task = tasks[index];

        ApiInstance.patch("/user/tasks/" + task._id, undefined, {
            auth: {
                username: user.user.email,
                password: user.user.password
            }
        }).then((response) => {
            if (response.status == 200) {
                task.complated = true;
                setTasks([...tasks]);
            }
        })
    }

    function RemoveTask(index: number) {
        let task = tasks[index]._id;

        ApiInstance.delete("/user/tasks/" + task, {
            auth: {
                username: user.user.email,
                password: user.user.password
            }
        }).then((response) => {
            if (response.status == 200) {
                tasks.splice(index, 1);
                setTasks([...tasks]);
            }
        });
    }

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center">
            <div className="animate-spin h-32 w-32 rounded-full border-8 border-primary border-t-violet-500" />
        </div>
    }

    return <section className="h-screen w-screen flex items-center justify-center bg-primary">
        <div className="relative flex flex-col w-[32rem] h-[40rem] rounded-[1.5625rem] bg-white shadow-xl p-4">
            <h1 className="w-full h-[4rem] text-[2rem] font-bold text-center">Tasks</h1>
            <div className="flex flex-col h-full overflow-hidden overflow-y-auto">
                <TaskCreator pushItem={CreateNewTask} />
                {tasks.map((task, index) => {
                    if (task.complated) {
                        return <CompletedTaskItem key={index} content={task.content} complated={task.complated} removeItem={() => RemoveTask(index)} complateItem={() => ComplateTask(index)} />
                    } return <TaskItem key={index} content={task.content} complated={task.complated} removeItem={() => RemoveTask(index)} complateItem={() => ComplateTask(index)} />
                })}
            </div>
        </div>
    </section>
}

export default Tasks;
