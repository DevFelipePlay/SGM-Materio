import { IResPostAuthLogin } from 'src/context/types'
import apiPlaySgm from '../apiPlaySgm'
import { IReqPostAuthLogin } from './IReqPostAuthLogin'

export const postAuthLogin = async (req: IReqPostAuthLogin) =>
  (await apiPlaySgm.post<IResPostAuthLogin>(`/auth/login`, req)).data
