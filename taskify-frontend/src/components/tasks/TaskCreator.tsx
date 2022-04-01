import { useState } from "react";

function TaskCreator({ pushItem }: { pushItem: (taskName: string, checked?: boolean, expire?: Date) => void }) {
    let [taskName, setTaskName] = useState("");

    function handleInput(e: any) {
        setTaskName(e.target.value);
    }

    function validateInputAndPush() {
        if (!taskName) {
            return;
        }

        pushItem(taskName);
    }

    return <div className="h-[3rem] rounded-full flex text-title-1 font-medium text-[1rem] mb-2">
        <input onInput={handleInput} placeholder="Type a task..." className="h-[3rem] w-full bg-primary rounded-full px-4 py-2 outline-none text-lg mr-2" type="text" />
        <div onClick={validateInputAndPush} className="h-[3rem] w-[3rem] bg-[#CC61FE] hover:bg-opacity-80 flex items-center justify-center shrink-0 grow rounded-full cursor-pointer">
            <span className="iconify text-white" data-icon="akar-icons:plus" data-width="24" data-height="24"></span>
        </div>
    </div>
}

export default TaskCreator;
