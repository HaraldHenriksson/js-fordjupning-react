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
	name: string
	photoFile: FileList
	email: string
	password: string
	passwordConfirm: string
}