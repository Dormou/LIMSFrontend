export enum TestDescriptionResult {
  Success,
  Fail,
  Undefined
}

export enum TestDescriptionStatus {
  UnderApproval,
  InQueue,
  InProgress,
  Done
}

export type TestDescriptionGroup = {
  equipmentName: string
  equipmentGuid: string
  TestDescriptions?: TestDescription[]
}

export type TestDescription = {
  guid: string
  dateOfCreation: Date
  dateOfLastUpdate: Date
  name: string
  description: string
  equipmentGuid: string
  equipmentName: string
}
