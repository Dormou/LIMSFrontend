export enum TestResult {
  Success,
  Fail,
  Undefined
}

export enum TestStatus {
  UnderApproval,
  InQueue,
  InProgress,
  Done
}

export type TestDescription = {

}

export type Application = {
  guid: string;
  dateOfCreation: string;
  dateOfLastUpdate: string;
  currentStatus: CurrentStatus;
  applicant: Applicant;
  deviceModel: string;
  deviceType: DeviceType;
  comment: string;
  tests: TestGroup[];
}

export interface CurrentStatus {
  dateOfCreation: string;
  name: string;
  internalLabel: string;
  externalLabel: string;
  message: string;
}
export interface Applicant {
  guid: string;
  dateOfCreation: string;
  dateOfLastUpdate: string;
  firstName: string;
  lastName: string;
  email: string;
  secondName: string;
  position: string;
  company: string;
  address: string;
  phoneNumber: string;
  isVerified: boolean;
}
export interface DeviceType {
  guid: string;
  dateOfCreation: string;
  dateOfLastUpdate: string;
  name: string;
}
export interface TestGroup {
  equipmentName: string;
  equipmentGuid: string;
  tests?: Test[];
}
export interface Test {
  guid: string;
  name: string;
  description: string;
  testStatus: number;
  deadline: string;
  testResult: number;
}
