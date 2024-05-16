export type SignInResponse = {
    token: string
    message: string
}

export type SignInUserInfoResponse = {
    token: string
    firstname: string
    lastname: string
    additionalname: string
    dolgnost: string
    orgname: string
    orgaddress: string
    signUpDate: string
    phone: string
    email: string
    session: string
    passwordUpdateAt: Date 
}

export type SignUpResponse = {
    message: string
}

export type ActivationResponse = {
    token: string
    message: string
}

export type ForgotPasswordResponse = {
    message: string
}

export type ActivateNewPasswordResponse = {
    token: string
    message: string
}

export type FetchAccountsResponse = {
    id: string
    fullname: string
    accessRights: string
    storyActions: string
}