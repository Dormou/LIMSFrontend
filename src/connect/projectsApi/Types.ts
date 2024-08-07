export type Project = {
  guid: string;
  dateOfCreation: string;
  dateOfLastUpdate: string;
  executor: Executor;
  application: Application;
  deadline: Date;
  dutRegistrationData: string;
}

export type InternalUser = {
guid: string
dateOfCreation: Date
dateOfLastUpdate: Date
firstName: string
lastName: string
email: string
secondName: string
position: string
phoneNumber: string
isVerified: boolean
}
export type Executor = {
  guid: string;
  dateOfCreation: string;
  dateOfLastUpdate: string;
  firstName: string;
  lastName: string;
  email: string;
  secondName: string;
  position: string;
  phoneNumber: string;
  isVerified: boolean;
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
  tests?: Test[];
}

export type Test = {
  guid: string;
  testDescriptionGuid: string
  name: string;
  description: string;
  testStatus: number;
  deadline: Date;
  testResult: number;
}

export type ProjectArchive = {
  id: string
  typeName: string
  modelName: string
  isProcess: boolean
  tester: Tester
  application: ApplicationArchive
  cards: CardArchive[]
  deadline: Date
  release: Date
  status: StatusProject
}

export type ApplicationArchive = {
  name:string
}

export type Message = {
  userid: string
  username: string
  value: string
}

export type Expert = {
  firstname: string
  lastname: string
  datePinnded: Date
}

export type Creator = {
  id: string
  firstname: string
  lastname: string
}

export type Card_ = {
  id: string
  name: string
  expert: Expert
  documents: string[]
  messages: Message[]
  deadline: Date
  release: Date
  descryption: string
  status: CardStatus
  creator: Creator
  createAt: Date
  result: Result
  equipment: Equipment
}

export type CardArchive = {
  id: string
  name: string
  expert: Expert
  documents: string[]
  messages: Message[]
  deadline: Date
  release: Date
  descryption: string
  creator: Creator
  createAt: Date
  result: Result
  equipment: Equipment
}

export type Equipment = {
  id: string
  name: string
}

export enum Result {
  none,
  accept,
  reject
}

export enum CardStatus {
  perProcess,
  process,
  release
}

export type Tester = {
  firstname: string
  lastname: string
}

export enum StatusTest {
  accept,
  reject,
  undefined
}

export enum StatusProject {
  agreement,
  agreementSetup,
  awaitDevice,
  inWork,
  release
}