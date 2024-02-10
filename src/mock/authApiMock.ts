import { randomUUID } from "crypto"
import { FetchAccountsResponse } from "../connect/authApi/Responses"

export const fetchAccounts = () => {
    const response : FetchAccountsResponse[] = [
        {
            id: "ds123213adsa",
            fullname: "Игорь Светлый Викторович",
            accessRights: "Full",
            storyActions: "story"
        },
        {
            id: "dsad3333sa",
            fullname: "Владимир Темный Игорович",
            accessRights: "NotFull",
            storyActions: "story"
        },
        {
            id: "dsa44343dsa",
            fullname: "Оксана Серая Сергеевна",
            accessRights: "Full",
            storyActions: "story"
        },
        {
            id: "dsad45345454535sa",
            fullname: "Иван Черт Петрович",
            accessRights: "Full",
            storyActions: "story"
        }
    ]

    return response
}