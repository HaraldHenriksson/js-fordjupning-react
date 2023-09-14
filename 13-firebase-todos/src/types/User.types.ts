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
	photoUrl: string
	email: string
	password: string
	passwordConfirm: string
}