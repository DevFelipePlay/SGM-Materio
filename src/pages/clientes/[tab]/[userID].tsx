// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const UserView = ({ tab, invoiceData, userID }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter()
  const user = query.userID

  const [userData, setUserData] = useState([])

  async function getUserByCPF(cpf: string) {
    try {
      const response = await axios.get('/users/search', { params: { cpf } })

      setUserData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    //@ts-ignore
    getUserByCPF(user)
  }, [user])

  return <UserViewPage tab={tab} invoiceData={invoiceData} userID={userID} user={userData} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData: InvoiceType[] = res.data.allData
  const userID = params?.userID

  return {
    props: {
      invoiceData,
      tab: params?.tab,
      userID
    }
  }
}

export default UserView
