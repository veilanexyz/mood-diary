import React, { Component } from "react";

class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      date,
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }

  months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  componentDidMount() {
    this.manipulate();
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.month !== this.state.month ||
      prevState.year !== this.state.year
    ) {
      this.manipulate();
    }
  }

  manipulate = () => {
    const { year, month, date } = this.state;
    const dayone = (new Date(year, month, 1).getDay() + 6) % 7;
    const lastdate = new Date(year, month + 1, 0).getDate();
    const dayend = (new Date(year, month, lastdate).getDay() + 6) % 7;
    const monthlastdate = new Date(year, month, 0).getDate();

    const lit = [];
    for (let i = dayone; i > 0; i--) {
      lit.push(
        `<li class="calendar__body-day--inactive">${monthlastdate - i + 1}</li>`
      );
    }

    for (let i = 1; i <= lastdate; i++) {
      const isToday =
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? "active"
          : "";
      lit.push(`<li class="${isToday}">${i}</li>`);
    }

    for (let i = dayend; i < 6; i++) {
      lit.push(
        `<li class="calendar__body-day--inactive">${i - dayend + 1}</li>`
      );
    }

    const calendarDatesContainer = document.querySelector(
      ".calendar__body-numbers"
    );
    calendarDatesContainer.innerHTML = "";

    while (lit.length) {
      const row = lit.splice(0, 7);
      const rowHtml = `<div class="calendar__body-separator"></div><ul class="calendar__body-numberrow">${row.join(
        ""
      )}</ul><div class="calendar__body-circlerow">${row
        .map((item) => {
          if (item.includes("calendar__body-day--inactive")) {
            return '<div class="calendar__body-circle--inactive"></div>';
          } else {
            return '<div class="calendar__body-circle"></div>';
          }
        })
        .join("")}</div>`;
      calendarDatesContainer.innerHTML += rowHtml;
    }

    document.querySelector(
      ".calendar__header-month"
    ).innerText = `${this.months[month]} ${year}`;
  };

  handlePrevNext = (direction) => {
    this.setState((prevState) => {
      let { month, year } = prevState;
      month = direction === "prev" ? month - 1 : month + 1;

      if (month < 0 || month > 11) {
        const date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();
      }

      return { month, year };
    });
  };

  render() {
    return (
      <div className="calendar">
        <div className="calendar__header">
          <svg
            className="arrow"
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => this.handlePrevNext("prev")}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.426166 4.48472C0.0782765 4.77359 0.0543061 5.25185 0.395191 5.54896C0.968948 6.04904 2.10152 6.87315 4.22928 7.94275C6.3463 9.00694 7.82416 9.54585 8.76126 9.81834C9.39872 10.0037 9.90636 9.45238 9.78167 8.80034C9.6308 8.01145 9.45701 6.97454 9.37382 6.01871C10.3463 6.07623 12.5043 6.16384 14.6622 5.9822C17.5738 5.73714 20 5.49207 20 5.00195C20 4.51183 17.5127 4.21319 14.6622 4.02168C12.5505 3.8798 10.3573 3.94907 9.37308 3.99381C9.45588 3.03669 9.62996 1.99721 9.78115 1.20629C9.90595 0.553421 9.3946 -0.00460102 8.75491 0.176004C7.87547 0.424299 6.53887 0.901334 4.71454 1.81609C2.42681 2.9632 1.0978 3.92702 0.426166 4.48472Z"
              fill="#7C6969"
            />
          </svg>
          <span className="calendar__header-month"></span>
          <svg
            className="arrow"
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => this.handlePrevNext("next")}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5739 5.51528C19.9218 5.22641 19.9457 4.74815 19.6048 4.45104C19.0311 3.95096 17.8985 3.12685 15.7707 2.05725C13.6537 0.993062 12.1759 0.454152 11.2388 0.18166C10.6013 -0.0036993 10.0937 0.547621 10.2184 1.19966C10.3692 1.98855 10.543 3.02546 10.6262 3.98129C9.65371 3.92377 7.49575 3.83616 5.33779 4.0178C2.42627 4.26286 0 4.50793 0 4.99805C0 5.48817 2.48736 5.78681 5.33779 5.97832C7.44949 6.1202 9.64278 6.05093 10.627 6.00619C10.5442 6.96331 10.3701 8.00279 10.2189 8.79371C10.0941 9.44658 10.6054 10.0046 11.2451 9.824C12.1246 9.5757 13.4612 9.09867 15.2855 8.18391C17.5732 7.0368 18.9022 6.07298 19.5739 5.51528Z"
              fill="#7C6969"
            />
          </svg>
        </div>
        <div className="calendar__body">
          <div className="calendar__body-days">
            <span>Пн</span>
            <span>Вт</span>
            <span>Ср</span>
            <span>Чт</span>
            <span>Пт</span>
            <span>Сб</span>
            <span>Вс</span>
          </div>
          <div className="calendar__body-numbers"></div>
        </div>
      </div>
    );
  }
}

export default Calendar;
