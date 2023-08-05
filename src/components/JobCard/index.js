import {Link} from 'react-router-dom'

import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-item">
        <div className="logo-company-container">
          <img className="logo-image" src={companyLogoUrl} alt="company logo" />
          <div className="logo-rating-container">
            <h1 className="company-title">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="icon" />
              <p className="location-type-heading">{location}</p>
            </div>
            <div className="employment-type-container">
              <BsFillBriefcaseFill className="icon" />
              <p className="location-type-heading">{employmentType}</p>
            </div>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
