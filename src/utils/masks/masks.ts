import { mask } from 'remask'

export const maskCnpj = (value: any) => (!!value ? mask(value, ['99.999.999/9999-99']) : '')
export const maskCpf = (value: any) => (!!value ? mask(value, ['999.999.999-99']) : '')
export const maskCelular = (value: any) => (!!value ? mask(value, ['(99) 9 9999-9999']) : '')
export const maskTelefone = (value: any) => (!!value ? mask(value, ['(99) 9999-9999']) : '')
export const maskCep = (value: any) => (!!value ? mask(value, ['99999-999']) : '')
