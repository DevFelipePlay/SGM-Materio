import apiPlaySgm from 'src/services/apiPlaySgm'
import { IReqPostPlayAutorizaCadastro } from './IReqPostPlayAutorizaCadastro'

export const postPlayAutorizaCadastro = async (req: IReqPostPlayAutorizaCadastro) =>
  (await apiPlaySgm.post('/autorizaCadastro', req)).data
