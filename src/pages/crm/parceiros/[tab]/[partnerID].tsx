// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
// import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PartnerProfileHeader from 'src/views/parceiros/HeaderDetails'

const PartnerView = ({ tab, partnerID }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter()
  const partner = query.partnerID

  const [userData, setUserData] = useState([])

  async function getUserByCPF(id: string) {
    try {
      const response = await axios.get('/parceiros/search', { params: { id } })

      setUserData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // @ts-ignore
    getUserByCPF(partner)
  }, [partner])

  return <PartnerProfileHeader />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  // const res = await axios.get('/apps/invoice/invoices')
  // const invoiceData: InvoiceType[] = res.data.allData
  const partnerID = params?.partnerID

  return {
    props: {
      // invoiceData,
      tab: params?.tab,
      partnerID
    }
  }
}

export default PartnerView
