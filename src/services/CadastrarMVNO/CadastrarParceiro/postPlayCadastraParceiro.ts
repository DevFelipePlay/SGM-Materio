import apiPlaySgm from 'src/services/apiPlaySgm'

export const postPlayCadastraParceiro = async (req: FormData) => (await apiPlaySgm.post('/insereParceiro', req)).data
