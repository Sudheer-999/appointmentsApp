import './index.css'

const AppointmentItem = props => {
  const {details, toggleStarredItem} = props
  const {id, title, date, isStarred} = details

  const toggleStar = () => {
    toggleStarredItem(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <div className="list-item">
      <div className="list-top">
        <p className="list-title">{title}</p>
        <button
          type="button"
          onClick={toggleStar}
          className="like-btn"
          data-testid="star"
        >
          <img src={starImage} alt="star" className="like-img" />
        </button>
      </div>
      <p className="list-date">Date: {date}</p>
    </div>
  )
}

export default AppointmentItem
