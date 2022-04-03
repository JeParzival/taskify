export type TaskItemProps = {
    _id?: string;
    expiresAt?: Date,
    content: string,
    complated?: boolean,
}

export type TaskItemControlProps = {
    removeItem: () => void,
    complateItem: () => void,
}
