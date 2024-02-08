export type SignInResponse = {
    token: string
    firstname: string
    lastname: string
    email: string
    message: string
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