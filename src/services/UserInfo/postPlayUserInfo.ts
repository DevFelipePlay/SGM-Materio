import apiPlaySgm from 'src/services/apiPlaySgm'
import { IReqPostPlayUserInfo } from './IReqPostPlayUserInfo'

export const postPlayUserInfo = async (req: IReqPostPlayUserInfo) => (await apiPlaySgm.post('/userInfo', req)).data
