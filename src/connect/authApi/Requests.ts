export type SignInEmailRequest = {
    email: string
    password: string
}

export type SignUpEmailRequest = {
    firstname: string
    lastname: string
    email: string
    password: string
}

export type ActivationRequest = {
    code: string
}

export type ForgotPasswordRequest = {
    email: string
}

export type ActivateNewPasswordRequest = {
    password: string
    email: string
}