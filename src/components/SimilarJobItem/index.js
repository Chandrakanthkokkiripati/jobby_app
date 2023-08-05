import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li key={id} className="similar-job-card">
      <div className="job-item-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-card"
        />
        <div className="company-title-rating-container">
          <h1 className="job-title-card">{title}</h1>
          <div className="company-rating-container">
            <AiFillStar className="star-icon-card" />
            <p className="rating-number-card">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading-card">Description</h1>
      <p className="job-description-card">{jobDescription}</p>
      <div className="job-location-employment-container">
        <div className="location-employment-container">
          <IoLocationSharp className="type-icon" />
          <p className="type-text">{location}</p>
        </div>
        <div className="employment-type-container">
          <BsFillBriefcaseFill className="type-icon" />
          <p className="type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
