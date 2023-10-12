import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    checkboxInputs: [],
    minimumSalary: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, minimumSalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    // console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      this.setState({
        jobsList: data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          title: eachJob.title,
          rating: eachJob.rating,
        })),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value}, this.getJobDetails)
  }

  onChangeEmploymentType = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === eachItem.id,
    )
    // console.log(inputNotInList)
    if (!checkboxInputs.includes(event)) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event],
        }),
        this.getJobDetails,
      )
    } else {
      const filteredData = checkboxInputs.filter(eachItem => eachItem !== event)
      this.setState(() => ({checkboxInputs: filteredData}), this.getJobDetails)
    }
    console.log(checkboxInputs)
    // if (inputNotInList.length === 0) {
    //   this.setState(
    //     prevState => ({
    //       checkboxInputs: [...prevState.checkboxInputs, event.target.id],
    //     }),
    //     this.getJobDetails,
    //   )
    // } else {
    //   const filteredData = checkboxInputs.filter(
    //     eachItem => eachItem !== event.target.id,
    //   )
    //   this.setState(() => ({checkboxInputs: filteredData}), this.getJobDetails)
    // }
  }

  onChangeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobDetails)
  }

  onEnterSearch = e => {
    if (e.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderSuccessJobDetails = () => {
    const {jobsList} = this.state
    const renderJobs = jobsList.length > 0
    return renderJobs ? (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-list-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.onClickRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-content">
            <div className="mobile-search-input-container">
              <input
                className="input-search-field"
                placeholder="Search"
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearch}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.getJobDetails}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSalary={this.onChangeSalary}
              changeEmploymentType={this.onChangeEmploymentType}
            />
            <div className="search-jobs-container-medium">
              <div className="search-input-container">
                <input
                  className="input-search-field"
                  placeholder="Search"
                  type="search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearch}
                />
                <button
                  className="search-button"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.getJobDetails}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
