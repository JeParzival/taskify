import { TaskItemProps, TaskItemControlProps } from "./Types";

function TaskItem({ content: name, complateItem: completeItem, removeItem }: TaskItemProps & TaskItemControlProps) {
    return <div draggable className="fade-in group h-[3rem] bg-primary rounded-full px-4 py-2 flex items-center text-title-1 font-medium text-[1rem] mb-2">
        <div onClick={() => completeItem()}>
            <span className="iconify text-white mr-2 text-[#CC00FF] text-opacity-50 cursor-pointer" data-icon="akar-icons:circle" data-width="28" data-height="28"></span>
        </div>
        {name}
        <div className="ml-auto" onClick={() => removeItem()}>
            <span className="iconify text-title-2 text-opacity-50 opacity-0 transition group-hover:opacity-100 hover:text-opacity-100 cursor-pointer" data-icon="bi:x-lg" data-width="28" data-height="28"></span>
        </div>
    </div>
}

export default TaskItem;
