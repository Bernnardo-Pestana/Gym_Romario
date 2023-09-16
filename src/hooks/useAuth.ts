import {useContext} from 'react'
import {AuthContext} from '../context/authContext'

const useAuth = () => {
  const values = useContext(AuthContext)

  return {...values}
}

export default useAuth
