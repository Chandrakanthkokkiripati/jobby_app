import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeSalary,
    changeEmploymentType,
  } = props

  const renderEmploymentList = () => (
    <div className="employee-type-container">
      <h1>Type of Employment</h1>
      <ul className="employment-type-list-container">
        {employmentTypesList.map(eachType => {
          const onChangeEmployeeList = () => {
            changeEmploymentType(eachType.employmentTypeId)
          }
          return (
            <li onChange={onChangeEmployeeList} key={eachType.employmentTypeId}>
              <input
                value={eachType.employmentTypeId}
                id={eachType.employmentTypeId}
                type="checkbox"
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSalaryList = () => (
    <div className="salary-range-container">
      <h1>Salary Range</h1>
      <ul className="salary-range-list-container">
        {salaryRangesList.map(eachSalary => {
          const onChangeSalary = () => {
            changeSalary(eachSalary.salaryRangeId)
          }
          return (
            <li onChange={onChangeSalary} key={eachSalary.label}>
              <input
                value={eachSalary.salaryRangeId}
                id={eachSalary.salaryRangeId}
                type="radio"
                name="salary"
              />
              <label htmlFor={eachSalary.salaryRangeId}>
                {eachSalary.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderEmploymentList()}
      <hr className="horizontal-line" />
      {renderSalaryList()}
    </div>
  )
}

export default FiltersGroup
