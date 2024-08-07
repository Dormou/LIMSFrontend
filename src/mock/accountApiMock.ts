import { ChangeUserInfoResponse, ChangeUserPhotoResponse, GetNotificationsResponse, SignInResponse, UserInfoResponse, UserPhotoResponse } from "../connect/authApi/Responses"
import { ChangePasswordRequest, ChangeUserInfoRequest, ChangeUserPhotoRequest, NotificationReadRequest, SignInEmailRequest } from '../connect/authApi/Requests'
import { http, HttpResponse, PathParams } from 'msw'

export const handlersAccountApi = [
    http.get('http://localhost:5075/passport/account/userinfo', ({ request }) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return

        return HttpResponse.json<UserInfoResponse>({
            id: id,
            token: "sfsdgdsgfdgdgfgdg",
            firstname: "Billy",
            signUpDate: new Date(Date.now()).toString(),
            lastname: "Herrington",
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

    http.get('http://localhost:5075/passport/account/photo', async ({request}) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return HttpResponse.error()

        const localPhoto = localStorage.getItem('lims.userPhoto')
        const photo = localPhoto? JSON.parse(localPhoto): ''

        return HttpResponse.json<UserPhotoResponse>({
            photo: photo
        })
    }),

    http.get('http://localhost:5075/passport/account/notifications', ({request}) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return HttpResponse.error()

        return HttpResponse.json<GetNotificationsResponse>({
            notifications: [
                {title: 'hello world', text: 'This is first notifi'},
                {title: 'test world', text: 'This is second notifi'},
                {title: 'hello hell', text: 'hello hell'},
                {title: 'you set is expert to LIMS', text: 'LIMS is labaratory CR'},
            ]
        })
    }),

    http.post<PathParams, NotificationReadRequest>('http://localhost:5075/passport/account/notification/read', async ({request}) => {
        const data = request.json()

        if((await data).id) return

        return new Response()
    }),

    http.post<PathParams, SignInEmailRequest>('http://localhost:5075/passport/account/signin', async ({request}) => {
        const data = await request.json()

        if(data.email !== 'kravter7@gmail.com' && data.password !== '12345') return

        return HttpResponse.json<SignInResponse>({
            id: 'test',
            token: "sfsdgdsgfdgdgfgdg",
            message: "success"
        })
    }),
    
    http.post<PathParams, ChangeUserPhotoRequest>('http://localhost:5075/passport/account/photo/change', async ({request}) => {
        const data = await request.json()

        if(data.id !== 'test' && data.photo) return

        return HttpResponse.json<ChangeUserPhotoResponse>({
            photo: data.photo
        })
    }),

    http.post<PathParams, ChangeUserInfoRequest>('http://localhost:5075/passport/account/user/change', async ({request}) => {
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

    http.post<PathParams, ChangePasswordRequest>('http://localhost:5075/passport/account/password/change', async ({request}) => {
        const data = await request.json()

        if(data.id !== 'test' && data.lastPaswword !== '12345') return HttpResponse.error()

        console.log(data)

        return new Response();
    })
]