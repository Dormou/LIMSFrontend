import { Test, TestResult, TestStatus } from "./Types"

export type UpdateTestRequest = {
    guid: string
    testStatus: number
    deadline: Date
    testResult: number
}

export type AddTestRequest = {
    name: string
    isProcess: boolean
    //tester: Tester
    test: Test
    deadline: Date
    TYC: string
}