export type TaskItemProps = {
    expireDate?: Date,
    name: string,
    checked?: boolean,
}

export type TaskItemControlProps = {
    removeItem: () => void,
    completeItem: () => void,
}
