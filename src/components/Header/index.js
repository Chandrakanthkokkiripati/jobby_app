import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-bg-container">
      <div className="mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobile-home-logo"
          />
        </Link>
        <ul className="mobile-nav-element-container">
          <li className="mobile-nav-element">
            <Link to="/">
              <AiFillHome size="30" color="#ffffff" />
            </Link>
          </li>
          <li className="mobile-nav-element">
            <Link to="/jobs">
              <BsFillBriefcaseFill size="30" color="#ffffff" />
            </Link>
          </li>
          <li className="mobile-nav-element">
            <button
              className="mobile-logout-button"
              onClick={onClickLogout}
              type="button"
            >
              <FiLogOut size="30" color="#ffffff" />
            </button>
          </li>
        </ul>
      </div>
      <div className="large-screen-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="large-screen-logo"
        />
        <ul className="nav-menu">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          className="logout-large-button"
          type="button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
