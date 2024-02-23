// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports

// ** Demo Components Imports
import PartnerProfileHeader from 'src/views/parceiros/HeaderDetails'
import TabDetails from 'src/views/parceiros/tabDetails'

const PartnerView = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  //** Chamada de endpoint V */
  // const { query } = useRouter()

  // const partner = query.partnerID

  // const [userData, setUserData] = useState([])

  // async function getUserByCPF(id: string) {
  //   try {
  //     const response = await axios.get('/parceiros/list', { params: { id } })

  //     setUserData(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   // @ts-ignore
  //   getUserByCPF(partner)
  // }, [partner])

  return (
    <>
      <PartnerProfileHeader />
      <TabDetails tab={''} invoiceData={[]} userID={''} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const partnerID = params?.partnerID

  return {
    props: {
      tab: params?.tab,
      partnerID
    }
  }
}

export default PartnerView
