import { Token } from './Session'
import { User } from './User'

type ResponseData = {
    message: string
    user?: User
    token?: Token
}
