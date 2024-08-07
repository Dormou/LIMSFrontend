import { Application } from "./Types"

export type TestResponse = {
    guid: string
    application: Application
    //testDescription: TestDescription
    testStatus: number
    deadline: Date
    testResult: number
}