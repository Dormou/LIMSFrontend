import { HttpResponse, PathParams, http } from "msw"
import { FetchProjectsArchiveResponse, FetchProjectsResponse, ProjectResponse } from "../connect/projectsApi/Responses"
import { create } from "domain"
import { AddProjectRequest, FetchProjectsRequest } from "../connect/projectsApi/Request"
import { CardStatus, Result, StatusProject, StatusTest } from "../connect/projectsApi/Types"
import { v4 as uuidV4 } from "uuid"

export const handlersProjectsApi = [
    http.get('https://mock.com/projects', ({request}) => {
        const id = new URL(request.url).searchParams.get('id')

        if(!id) return HttpResponse.error()

        return HttpResponse.json<ProjectResponse>({
            id: 'asddas',
            name: 'TEST',
            isProcess: true,
            createAt: new Date(Date.now()),
            updateAt: new Date(Date.now()),
            deadline: new Date(Date.now() + Date.now()/10000),
            perProcessCards: [],
            processCards: [],
            acceptCards: []
        })
    }),

    http.post<PathParams, AddProjectRequest>('https://mock.com/projects/add', async ({request}) => {
        const data = await request.json()

        await new Promise((resolve) => setTimeout(resolve, 1000))

        if(!data) return HttpResponse.error()

        return HttpResponse.json<string>(uuidV4())
    }),

    http.post<PathParams, FetchProjectsRequest>('https://mock.com/projects/fetch', async ({request}) => {
        const data = await request.json()

        await new Promise((resolve) => setTimeout(resolve, 1000))

        return HttpResponse.json<FetchProjectsResponse>({projects: [
            {
                id: uuidV4(),
                typeName: 'TEST',
                status: StatusProject.agreement,
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                modelName: "SUR123",
                createAt: new Date(Date.now() - Date.now()/20000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/20000),
                cards: [
                    {
                        id: "8c3ce9a0-a4ba-4ddc-a5df-e011702f0c7d",
                        status: CardStatus.perProcess,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',
                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: "6995065d-d72a-48b9-a935-13334a93d4b1",
                            name: "Device A",

                        },
                        result: Result.none,
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.release,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD2",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: "7e1cb87a-6af6-49ba-a579-6f71f1dbeb6e",
                            name: "Device B",

                        },
                        result: Result.none
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.release,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD3",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: "d6fb6450-9422-4a91-ad3a-8e3607d2bc88",
                            name: "Device C",

                        },
                        result: Result.none
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.process,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device D",

                        },
                        result: Result.none
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.perProcess,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device X",

                        },
                        result: Result.none
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.perProcess,
                        createAt: new Date(Date.now() + Date.now()/5000),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device Q",

                        },
                        result: Result.none
                    }
                ],
            },
            {
                id: 'xxx',
                typeName: 'TEST2',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
            },
            {
                id: 'sss',
                typeName: 'TEST3',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/15000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'hjhkjkk',
                typeName: 'TEST4',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/20000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/20000),
                cards: [],
            },
            {
                id: 'ssxxx',
                typeName: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
            },
            {
                id: 'ssxxx',
                typeName: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
            },
            {
                id: 'ssxxx',
                typeName: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
            },
            {
                id: 'ssxxx',
                typeName: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
            },
            {
                id: 'ssxxx',
                typeName: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
            },
            {
                id: 'xxxsss',
                typeName: 'TEST6',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                createAt: new Date(Date.now() - Date.now()/15000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            }
        ]})
    }),

    http.post<PathParams, FetchProjectsRequest>('https://mock.com/projects/fetch/archive', async ({request}) => {
        const data = await request.json()

        await new Promise((resolve) => setTimeout(resolve, 3000));

        return HttpResponse.json<FetchProjectsArchiveResponse>({projects: [
            {
                id: 'zxc',
                typeName: 'TEST32',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                deadline: new Date(Date.now() + Date.now()/10000),
                release: new Date(Date.now() + Date.now()/12000),
                cards: [
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',
                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: "6995065d-d72a-48b9-a935-13334a93d4b1",
                            name: "Device A",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/6000),
                        createAt: new Date(Date.now() - Date.now()/6000),
                        descryption: 'описание',
                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: "7e1cb87a-6af6-49ba-a579-6f71f1dbeb6e",
                            name: "Device B",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: "d6fb6450-9422-4a91-ad3a-8e3607d2bc88",
                            name: "Device C",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',
                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device D",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',
                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device X",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device V",

                        },
                        result: Result.none
                    },
                ],
            },
            {
                id: 'mng',
                typeName: 'TEST322',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device T",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD2",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device AX",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD3",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device AZ",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device AF",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device AW",

                        },
                        result: Result.none
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",

                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000),
                        createAt: new Date(Date.now() - Date.now()/4000),
                        descryption: 'описание',

                        creator: {
                            id: uuidV4(),
                            firstname: "Billy",
                            lastname: "Herrington"
                        },
                        equipment: {
                            id: uuidV4(),
                            name: "Device ABN",

                        },
                        result: Result.none
                    }
                ],
            },
            {
                id: 'mhhfg',
                typeName: 'TEST33',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/55000),
                cards: [],
            },
            {
                id: 'hhgh',
                typeName: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
            },
            {
                id: 'hhgh',
                typeName: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
            },
            {
                id: 'hhgh',
                typeName: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
            },
            {
                id: 'hhgh',
                typeName: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghh',
                typeName: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
            },
            {
                id: 'ghhghh',
                typeName: 'TEST65',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                application: {
                    name: "Gachi LLC"
                },
                        modelName: "SUR123",
                        status: StatusProject.inWork,
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/55000),
                cards: [],
            }
        ]})
    }),
]