export type SignUpCredentials = {
    email: string
    password: string
    passwordConfirm: string
}

export type LoginCredentials = {
    email: string
    password: string
    passwordConfirm: string
}

export type UpdateProfileFormData = {
    displayName?: string
    photoFile: FileList
    photoURL?: string
    email: string
    password: string
    confirmPassword?: string
}