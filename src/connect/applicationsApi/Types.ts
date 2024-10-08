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

export type CurrentStatus = {
  dateOfCreation: string;
  name: string;
  internalLabel: string;
  externalLabel: string;
  message: string;
}

export type Applicant = {
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

export type DeviceType = {
  guid: string;
  dateOfCreation: string;
  dateOfLastUpdate: string;
  name: string;
}

export type TestGroup = {
  equipmentName: string;
  equipmentGuid: string;
  tests: Test[];
}

export type Test = {
  guid: string;
  name: string;
  description: string;
  testStatus: number;
  deadline: string;
  testResult: number;
}
