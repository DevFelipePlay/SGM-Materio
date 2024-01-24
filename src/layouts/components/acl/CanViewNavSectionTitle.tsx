// src/layouts/components/acl/CanViewNavSectionTitle.tsx
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const CanViewNavSectionTitle = (props: Props) => {
  const { children } = props

  return <>{children}</>
}

export default CanViewNavSectionTitle
