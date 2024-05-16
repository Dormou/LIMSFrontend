import { randomUUID } from "crypto"
import { FetchAccountsResponse, SignInUserInfoResponse } from "../connect/authApi/Responses"

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

export const getUser = () => {
    const response : SignInUserInfoResponse = {
        token: "sfsdgdsgfdgdgfgdg",
        firstname: "Ivan",
        signUpDate: new Date(Date.now()).toString(),
        lastname: "Vovanov",
        additionalname: "Gervecevich",
        dolgnost: "Pilot",
        orgname: "HyperAirBus",
        orgaddress: "air",
        phone: "+79044308421",
        email: "kravter7@gmail.com",
        session: "Браузер Yandex, Россия, г. Москва (вход выполнен в 09:24:15 13.05.2024)",
        passwordUpdateAt: new Date(Date.now() - 100)
    }

    return response
}