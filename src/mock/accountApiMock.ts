import { randomUUID } from "crypto"
import { ChangeUserInfoResponse, ChangeUserPhotoResponse, FetchAccountsResponse, SignInResponse, UserInfoResponse, UserPhotoResponse } from "../connect/authApi/Responses"
import { ChangePasswordRequest, ChangeUserInfoRequest, ChangeUserPhotoRequest, SignInEmailRequest } from '../connect/authApi/Requests'
import { http, HttpResponse, PathParams } from 'msw'
import { setupWorker } from "msw/lib/browser"
import { request } from "http"

import userIcon from '../source/images/test-avatar.png'

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

export const handlers = [
    http.get('https://mock.com/passport/account/userinfo', ({ request }) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return

        return HttpResponse.json<UserInfoResponse>({
            id: id,
            token: "sfsdgdsgfdgdgfgdg",
            firstname: "Herrington",
            signUpDate: new Date(Date.now()).toString(),
            lastname: "Billy",
            additionalname: "Gervecevich",
            dolgnost: "Danger Master",
            orgname: "HyperAirBus",
            orgaddress: "air",
            phone: "+79044308421",
            email: "kravter7@gmail.com",
            session: "Браузер Yandex, Россия, г. Москва (вход выполнен в 09:24:15 13.05.2024)",
            passwordUpdateAt: new Date(Date.now() - 100)
        })
    }),

    http.get('https://mock.com/passport/account/photo', async ({request}) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return HttpResponse.error()

        const localPhoto = localStorage.getItem('lims.userPhoto')
        const photo = localPhoto? JSON.parse(localPhoto): ''

        return HttpResponse.json<UserPhotoResponse>({
            photo: photo
        })
    }),

    http.post<PathParams, SignInEmailRequest>('https://mock.com/passport/account/signin', async ({request}) => {
        const data = await request.json()

        if(data.email !== 'kravter7@gmail.com' && data.password !== '12345') return

        return HttpResponse.json<SignInResponse>({
            id: 'test',
            token: "sfsdgdsgfdgdgfgdg",
            message: "success"
        })
    }),
    
    http.post<PathParams, ChangeUserPhotoRequest>('https://mock.com/passport/account/photo/change', async ({request}) => {
        const data = await request.json()

        if(data.id !== 'test' && data.photo) return

        return HttpResponse.json<ChangeUserPhotoResponse>({
            photo: data.photo
        })
    }),

    http.post<PathParams, ChangeUserInfoRequest>('https://mock.com/passport/account/user/change', async ({request}) => {
        const data = await request.json()

        if(data.id !== 'test') return

        console.log(data)

        return HttpResponse.json<ChangeUserInfoResponse>({
            firstname: data.firstname,
            lastname: data.lastname,
            additionalname: data.additionalname,
            dolgnost: data.dolgnost,
            email: data.email,
            phone: data.phone
        })
    }),

    http.post<PathParams, ChangePasswordRequest>('https://mock.com/passport/account/password/change', async ({request}) => {
        const data = await request.json()

        if(data.id !== 'test' && data.lastPaswword !== '12345') return HttpResponse.error()

        console.log(data)

        return new Response();
    })
]