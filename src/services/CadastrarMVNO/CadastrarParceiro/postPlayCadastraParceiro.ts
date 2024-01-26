import apiPlaySgm from 'src/services/apiPlaySgm'
import { IReqPostPlayCadastraParceiro } from './IReqPostPlayCadastraParceiro'

export const postPlayCadastraParceiro = async (req: IReqPostPlayCadastraParceiro) =>
  (await apiPlaySgm.post('/insereParceiro', req)).data
