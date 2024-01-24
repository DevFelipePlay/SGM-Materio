// src/layouts/components/acl/CanViewNavLink.tsx
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  const { children } = props

  return <>{children}</>
}

export default CanViewNavLink
