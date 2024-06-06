import { HttpResponse, PathParams, http } from "msw"
import { FetchProjectsArchiveResponse, FetchProjectsResponse, ProjectResponse } from "../connect/projectsApi/Responses"
import { create } from "domain"
import { AddProjectRequest, FetchProjectsRequest } from "../connect/projectsApi/Request"
import { CardStatus, StatusTest } from "../connect/projectsApi/Types"
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
                name: 'TEST',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/20000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/20000),
                cards: [
                    {
                        id: uuidV4(),
                        status: CardStatus.perProcess,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.release,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD2",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.release,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD3",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.process,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.perProcess,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
                    {
                        id: uuidV4(),
                        status: CardStatus.perProcess,
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    }
                ],
                TYC: "GR-567",
            },
            {
                id: 'xxx',
                name: 'TEST2',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'sss',
                name: 'TEST3',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/15000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'hjhkjkk',
                name: 'TEST4',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/20000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/20000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ssxxx',
                name: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ssxxx',
                name: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ssxxx',
                name: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ssxxx',
                name: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ssxxx',
                name: 'TEST5',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/17000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/15000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'xxxsss',
                name: 'TEST6',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                createAt: new Date(Date.now() - Date.now()/15000),
                updateAt: new Date(Date.now()),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            }
        ]})
    }),

    http.post<PathParams, FetchProjectsRequest>('https://mock.com/projects/fetch/archive', async ({request}) => {
        const data = await request.json()

        await new Promise((resolve) => setTimeout(resolve, 3000));

        return HttpResponse.json<FetchProjectsArchiveResponse>({projects: [
            {
                id: 'zxc',
                name: 'TEST32',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                deadline: new Date(Date.now() + Date.now()/10000),
                release: new Date(Date.now() + Date.now()/12000),
                cards: [
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/6000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
                ],
                TYC: "GR-567",
            },
            {
                id: 'mng',
                name: 'TEST322',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD2",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD3",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    },
{id: uuidV4(),
                        messages: [],
                        documents: [],
                        name: "TEST_CARD",
                        mandatoryTests: [
                            {
                               name: 'TEST TEST',
                               accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }
                        ],
                        nonMandatoryTests: [            
                            {
                            name: 'TEST TEST',
                            accept: StatusTest.accept
                            },
                            {
                                name: 'LOST TEST',
                                accept: StatusTest.accept
                            }                  
                        ],
                        expert: {
                            firstname: 'Ivan',
                            lastname: 'Vovanov',
                            datePinnded: new Date(Date.now() - Date.now()/10000)
                        },
                        deadline: new Date(Date.now() - Date.now()/5000),
                        release: new Date(Date.now() - Date.now()/4000)
                    }
                ],
                TYC: "GR-567",
            },
            {
                id: 'mhhfg',
                name: 'TEST33',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/55000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'hhgh',
                name: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'hhgh',
                name: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'hhgh',
                name: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'hhgh',
                name: 'TEST334',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/50000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),
                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghh',
                name: 'TEST335',
                isProcess: false,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/25000),
                cards: [],
                TYC: "GR-567",
            },
            {
                id: 'ghhghh',
                name: 'TEST65',
                isProcess: true,
                tester: {
                    firstname: "Billy",
                    lastname: "Herrington"
                },
                producer: {
                    name: "Gachi LLC"
                },
                release: new Date(Date.now() + Date.now()/12000),

                deadline: new Date(Date.now() + Date.now()/55000),
                cards: [],
                TYC: "GR-567",
            }
        ]})
    }),
]