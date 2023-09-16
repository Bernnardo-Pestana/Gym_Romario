/* eslint-disable react-hooks/exhaustive-deps */

import { Link, useNavigate } from 'react-router-dom'

import { Topbar } from './Topbar'
import styles from './Header.module.css'
import useAuth from '../../../hooks/useAuth'

export function HeaderWrapper() {
  const { loginInfo, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.header}`}>
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => navigate('/dashboard')}>
          <span className='text-primary  h3'>
            Adapt
          </span>
          <span className='text-danger h3'>
            Active
          </span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" onClick={() => navigate('/dashboard')}>Welcome {loginInfo.name}</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" aria-current="page" onClick={() => navigate('/user/update')}>Profile</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" aria-current="page" onClick={() => navigate('/settings')}>Settings</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => logout()}>Logout</a>
            </li>
          </ul>


        </div>
      </div>
    </nav>
  )
}
