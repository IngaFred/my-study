import React from 'react'
import { useLocation, matchRoutes, Navigate} from 'react-router-dom'
// 引入routers表
import { routers } from '../../router'

interface BeforeEachProps {
    children?: React.ReactNode
}

export default function BeforeEach(props: BeforeEachProps) {

    const location = useLocation()
    const matchs = matchRoutes(routers, location)
  return (
 
    <>{ props.children }</>
  )
}
