import { TestResult, TestStatus } from "./Types"

export type UpdateTestRequest = {
    guid: string
    testStatus: number
    deadline: Date
    testResult: number
}