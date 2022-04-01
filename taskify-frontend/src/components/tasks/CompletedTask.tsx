import { TaskItemProps, TaskItemControlProps } from "./Types";

function CompletedTaskItem({ name, removeItem, completeItem }: TaskItemProps & TaskItemControlProps) {
    return <div className="group h-[3rem] bg-primary rounded-full px-4 py-2 flex items-center text-title-1 font-medium text-[1rem] mb-2 line-through opacity-75">
        <span className="iconify text-white mr-2 text-[#CC00FF] text-opacity-50" data-icon="akar-icons:circle-check-fill" data-width="28" data-height="28"></span>
        {name}
        <div className="ml-auto" onClick={() => removeItem()}>
            <span className="iconify text-title-2 text-opacity-50 opacity-0 transition group-hover:opacity-100 hover:text-opacity-100 cursor-pointer" data-icon="bi:x-lg" data-width="28" data-height="28"></span>
        </div>
    </div>
}

export default CompletedTaskItem;
