import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: initialAppointmentList,
    starBtn: false,
  }

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStarredItem = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  toggleStarredBtn = () => {
    this.setState(prevState => ({starBtn: !prevState.starBtn}))
  }

  getStarredItems = () => {
    const {starBtn, appointmentList} = this.state
    let appointments

    if (starBtn === true) {
      appointments = appointmentList.filter(
        eachItem => eachItem.isStarred === true,
      )
    } else {
      appointments = appointmentList
    }

    return appointments
  }

  render() {
    const {title, date, starBtn} = this.state
    const appointments = this.getStarredItems()

    const starClassName = starBtn ? 'active-star-btn' : ''

    return (
      <div className="bg-container">
        <div className="sub-con">
          <h1 className="head">Add Appointment</h1>
          <div className="upper">
            <div className="details-con">
              <label htmlFor="tit" className="title-head">
                TITLE
              </label>
              <input
                type="text"
                id="tit"
                className="title-input"
                onChange={this.onTitle}
                value={title}
              />
              <label htmlFor="dat" className="date-head">
                DATE
              </label>
              <input
                type="date"
                id="dat"
                className="date-input"
                onChange={this.onDate}
                value={date}
              />
              <button
                className="btn"
                type="button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </div>
            <div className="appointment-img-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img"
              />
            </div>
          </div>
          <hr />
          <div className="lower">
            <div className="lower-top">
              <h1 className="appo-head">Appointments</h1>
              <button
                type="button"
                className={`starred-btn ${starClassName}`}
                onClick={this.toggleStarredBtn}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              <li>
                {appointments.map(eachItem => (
                  <AppointmentItem
                    details={eachItem}
                    key={eachItem.id}
                    toggleStarredItem={this.toggleStarredItem}
                  />
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
