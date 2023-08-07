<script setup>
  import {ref, onMounted} from 'vue';
  let savingMessage = ref('');
  
  
  function setUpPlanPage() {
    // Global variables
    const downButtons = document.getElementsByClassName('buttonDownBox');
    const upButtons = document.getElementsByClassName('buttonUpBox');
    const activityCardsContainer = document.querySelector('.activity-cards');
    let originalActivities = [];
    let activities = [];
    
    function fetchAndDrawActivities() {
      // Performing an HTTP GET request to given URL using fetch function, 
      return fetch('https://apprenticeship-2022-summer-backend.fly.dev/activities/')
        // Receives reponse as parameter then converts to JSON format
        .then((response) => response.json())
        .then((data) => {
          activities = data;
    
          // Sorting activities by position in day 
          activities.sort(function(a, b) {
            return a.positionInDay - b.positionInDay;
          });
    
          drawActivities(activities);
        })
    }
    
    function drawActivities(activities) {
      const activityCardHtml = `
        <div class="activity-card" id="" style="position: relative;">
          <div class="buttonDownBox">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="button-down">
              <path d="M9.33325 12.6667L15.9999 19.3334L22.6666 12.6667H9.33325Z" fill-opacity="0.8"/>
            </svg>
          </div>
    
          <div class="buttonUpBox">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="button-up">
              <path d="M9.33325 19.3334L15.9999 12.6667L22.6666 19.3334H9.33325Z" fill-opacity="0.8"/>
            </svg>
          </div>
    
          <div class="title-container">
            <h1 class="title"></h1>
            <h1 class="activity-type"></h1>
          </div>
          <div class="time-duration">
            <h1 class="duration"></h1>
          </div>
        </div>`;
    
      let activityCardCount = 6;
      const cards = document.getElementsByClassName('activity-card');
    
      let isLastActivity = false;
      let isFirstActivity = false;
    
      // This paragraph is clearing old activities and drawing new
      activityCardsContainer.innerHTML = '';
      for (let i = 0; i < activityCardCount; i++) {
        var activityCardElement = document.createElement('div');
        activityCardElement.innerHTML = activityCardHtml;
        activityCardsContainer.appendChild(activityCardElement.firstElementChild);
      }
    
      const heightTen = (10 / 5) * 38;
      const heightFifteen = (15 / 5) * 38;
      const heightTwenty = (20 / 5) * 38;
    
      for (let i = 0; i < activities.length; i++) {
        // Taking activity types and formating them accordingly
        activities[i].type = activities[i].type.replace(/_/g, ' ');
        activities[i].type = activities[i].type.replace(/\b\w/g, letter => letter.toUpperCase());
    
        // Assigning activity card heights based off durationMinutes
        if (activities[i].durationMinutes === 10) {
          cards[i].style.height = heightTen + 'px';
        } else if (activities[i].durationMinutes === 15) {
          cards[i].style.height = heightFifteen + 'px';
        } else if (activities[i].durationMinutes === 20) {
          cards[i].style.height = heightTwenty + 'px';
        }
    
        // Giving the cards their title, activity-type, duration
        cards[i].querySelector('.title').textContent = activities[i].title;
        cards[i].querySelector('.activity-type').textContent = activities[i].type;
        cards[i].querySelector('.duration').textContent = activities[i].durationMinutes + ' min';
    
        // Checking if activities are first/last 
        if (i === 0) {
          isFirstActivity = true;
        }
        else {
          isFirstActivity = false;
        }
    
        if (i === (activities.length - 1)) {
          isLastActivity = true;
        }
        else {
          isLastActivity = false;
        }
    
        // Giving the cards their specified color by checking activity type, and the buttons their colors by checking if its the first/last 
        if (activities[i].type === 'Instruction' || activities[i].type === 'Teacher Coding Exercise') {
          cards[i].style.backgroundColor = '#c890c1';
    
          if (!isLastActivity) {
            downButtons[i].style.backgroundColor = '#BA6FB1';
            downButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          }
          if (!isFirstActivity) {
            upButtons[i].style.backgroundColor = '#BA6FB1';
            upButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          }
    
          upButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          downButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          downButtons[i].querySelector('path').setAttribute('fill', '#2F2B2C');
          upButtons[i].querySelector('path').setAttribute('fill', '#2F2B2C');
        }
        else if (activities[i].type === 'Student Coding Exercise') {
          cards[i].style.backgroundColor = '#66cff4';
    
          if (!isLastActivity) {
            downButtons[i].style.backgroundColor = '#3bbeed';
            downButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          }
          if (!isFirstActivity) {
            upButtons[i].style.backgroundColor = '#3BBEED';
          }
    
          upButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          downButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          downButtons[i].querySelector('path').setAttribute('fill', '#2F2B2C');
          upButtons[i].querySelector('path').setAttribute('fill', '#2F2B2C');
        }
        else {
          cards[i].style.backgroundColor = '#fa967f';
    
          if (!isLastActivity) {
            downButtons[i].style.backgroundColor = '#F87B5E';
            downButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          }
          if (!isFirstActivity) {
            upButtons[i].style.backgroundColor = '#F87B5E';
          }
    
          upButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          downButtons[i].style.borderColor = 'rgba(47, 43, 44, 0.25)';
          downButtons[i].querySelector('path').setAttribute('fill', '#2F2B2C');
          upButtons[i].querySelector('path').setAttribute('fill', '#2F2B2C');
        }
        
        // Changing carrot color based on if first/last
        if (isLastActivity) {
          downButtons[i].querySelector('path').setAttribute('fill-opacity', '0.25');
        }
        if (isFirstActivity) {
          upButtons[i].querySelector('path').setAttribute('fill-opacity', '0.25');
        }
      }
    
      for (let i = 0; i < cards.length; i++) {
        // Checking if activities are first/last 
        if (i === 0) {
          isFirstActivity = true;
        }
        else {
          isFirstActivity = false;
        }
    
        if (i === (activities.length - 1)) {
          isLastActivity = true;
        }
        else {
          isLastActivity = false;
        }
    
        // Clicked button handling
        let currentPositionInDay = activities[i].positionInDay
        
        if (!isLastActivity) {
          downButtons[i].addEventListener('click', () => {
            onDownButtonClick(activities, i, currentPositionInDay);
          });
        }
        if (!isFirstActivity) {
          upButtons[i].addEventListener('click', () => {
            onUpButtonClick(activities, i, currentPositionInDay);
          });
        }
      }
    }
    
    function onDownButtonClick(activities, i, currentPositionInDay) {
      const calendarContent = document.querySelector('.calendar-content');
      const activityCards = document.querySelector('.activity-cards');
      savingMessage.value = '';
      savingMessage.value = '';
      savingMessage.value = 'saving';
      activityCards.classList.add('activity-cards--disabled');
      
      originalActivities = [...activities];
      
      // Drawing new activity list
      const newActivities = [...activities];
      let temp = newActivities[i];
      newActivities[i] = newActivities[i + 1];
      newActivities[i + 1] = temp;
      drawActivities(newActivities)
    
      fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[i].id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          'positionInDay': activities[i + 1].positionInDay,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((pos) => {
          return fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[i + 1].id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              'positionInDay': currentPositionInDay,
            }),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((pos) => {
              fetchAndDrawActivities();
              activityCards.classList.remove('activity-cards--disabled');
              savingMessage.value = '';
              savingMessage.value = 'saved';
              setTimeout(() => {
                savingMessage.value = '';
              }, 4000);
            });
        })
        .catch((err) => {
          drawActivities(originalActivities);
          savingMessage.value = '';
          savingMessage.value = 'error';
          activityCards.classList.remove('activity-cards--disabled');
          setTimeout(function() {
            savingMessage.value = '';
          }, 4000);
        })
    }
    
    function onUpButtonClick(activities, i, currentPositionInDay) {
      const calendarContent = document.querySelector('.calendar-content');
      const activityCards = document.querySelector('.activity-cards');

      calendarContent.classList.remove('calendar-content--saving');
      calendarContent.classList.remove('calendar-content--saved');
      calendarContent.classList.add('calendar-content--saving');
      activityCards.classList.add('activity-cards--disabled');
    
      originalActivities = [...activities];
      
      // Drawing new activity list
      const newActivities = [...activities];
      let temp = newActivities[i];
      newActivities[i] = newActivities[i - 1];
      newActivities[i - 1] = temp;
      drawActivities(newActivities)
    
      fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[i].id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          'positionInDay': activities[i - 1].positionInDay,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((pos) => {
          return fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[i - 1].id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              'positionInDay': currentPositionInDay,
            }),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((pos) => {
              fetchAndDrawActivities()
              activityCards.classList.remove('activity-cards--disabled');
              calendarContent.classList.remove('calendar-content--saving');
              calendarContent.classList.add('calendar-content--saved');
              setTimeout(() => {
                calendarContent.classList.remove('calendar-content--saved');
              }, 4000);
            });
        })
        .catch((err) => {
          drawActivities(originalActivities)
          calendarContent.classList.remove('calendar-content--saving');
          calendarContent.classList.remove('calendar-content--saved');
          calendarContent.classList.add('calendar-content--error');
          activityCards.classList.remove('activity-cards--disabled');
          setTimeout(function() {
            calendarContent.classList.remove('calendar-content--error');
          }, 4000);
        })
    }
    
    function drawCurrentDate() {
      function updateDate() {
        const now = new Date();
        let dayName = now.getDay(),
          monthName = now.getMonth(),
          dateNum = now.getDate();
    
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
    
        const week = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
    
        const ids = ['dayname', 'month', 'daynum'];
        const values = [week[dayName], months[monthName], addSuffix(dateNum)];
        for (var i = 0; i < ids.length; i++) {
          document.getElementById(ids[i]).textContent = values[i];
        }
      }
    
      function addSuffix(number) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
    
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
    
        if (lastDigit == 1 && lastTwoDigits != 11) {
          return number + 'st';
        }
        else if (lastDigit == 2 && lastTwoDigits != 12) {
          return number + 'nd';
        }
        else if (lastDigit == 3 && lastTwoDigits != 13) {
          return number + 'rd';
        }
        else {
          return number + 'th';
        }
      }
    
      updateDate();
      setInterval(updateDate, 1000);
    }

    fetchAndDrawActivities();
    drawCurrentDate();
  }
onMounted(setUpPlanPage)
</script>

<template>
  <!-- The section cards (larger scale) for Lesson Plan -->
  <div class="section-card">
    <h1>Lesson Plan</h1>
    <!-- Nests the date, times, and calendar divs -->
    <div class="calendar-content">
      <!-- Responsible for date -->
      <div class="date-container">
        <div class="date-display">
          <span id="dayname">Day</span>,
          <span id="month">Month</span>
          <span id="daynum"> 00</span>
        </div>
        
        <h1 v-if="savingMessage == 'saving'" class="save-message" >Saving...</h1>
        <h1 v-if="savingMessage == 'saved'" class="saved-message"><img src="./icons/done.svg">Saved</h1>
        <h1 v-if="savingMessage == 'error'" class="error-message"><img src="./icons/warning_amber.svg">Save Error</h1>
      </div>
      <!-- Card that holds times and calendar -->
      <div class="schedule-content">
        <!-- Div for time sections (slats) -->
        <div class="times">
          <div class="time">
            <h1 class="time-format">9:00 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:05 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:10 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:15 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:20 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:25 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:30 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:35 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:40 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:45 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:50 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">9:55 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">10:00 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">10:05 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">10:10 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">10:15 AM</h1>
          </div>
          <div class="time">
            <h1 class="time-format">10:20 AM</h1>
          </div>
        </div>
        <!-- Div responsible for holding the activity cards -->
        <div class="activity-cards">
          
        </div>
      </div>
    </div>
  </div>
</template>  

<style>
/* Styles for messages related to move button cases */
.save-message,
.saved-message,
.error-message {
  position: absolute;
  right: 0;
  margin-right: 18px;
  color: #2f2b2c;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  /* visibility: hidden; */
  margin-top: 2px;
  gap: 5px;
}

.calendar-content--saving .save-message,
.calendar-content--saved .saved-message,
.calendar-content--error .error-message {
  visibility: visible;
}

.activity-card {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid #ffffff;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
}

/* Down-button styling */
.buttonDownBox {
  position: absolute;
  width: 33px;
  height: 33px;
  right: 0;
  border: 1px solid;
  border-radius: 3px;
  margin-right: 16px;
  margin-top: 13px;
}

.activity-cards--disabled .buttonDownBox {
  background-color: transparent !important;
  pointer-events: none;
}

.activity-cards--disabled .buttonDownBox .button-down path {
  fill-opacity: 0.25;
}

.activity-card:not(:last-child) .activity-cards:not(.activity-cards--disabled) .button-down:hover path {
  fill: #2F2B2C;
  fill-opacity: 1;
}

.activity-cards:not(.activity-cards--disabled) .activity-card:not(:last-child) .buttonDownBox:hover {
  background-color: rgba(117, 117, 117, 0.40) !important;
  border-color: #2F2B2C !important;
}

/* Up-button styling */
.buttonUpBox {
  position: absolute;
  width: 33px;
  height: 33px;
  right: 0;
  border: 1px solid;
  border-radius: 3px;
  margin-right: 56px;
  margin-top: 13px;
}

.activity-cards--disabled .buttonUpBox {
  background-color: transparent !important;
  pointer-events: none;
}

.activity-cards--disabled .buttonUpBox .button-up path {
  fill-opacity: 0.25;
}

.activity-card:not(:first-child) .activity-cards:not(.activity-cards--disabled) .button-up:hover path {
  fill: #2F2B2C;
  fill-opacity: 1;
}

.activity-cards:not(.activity-cards--disabled) .activity-card:not(:first-child) .buttonUpBox:hover {
  background-color: rgba(117, 117, 117, 0.40) !important;
  border-color: #2F2B2C !important;
}

/* Navigation-bar */
.logo {
  width: 171px;
  height: 24px;
  flex-shrink: 0;
  position: absolute;
  left: 0;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.ellipse {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 106px;
}

.person {
  width: 22px;
  height: 22px;
  position: absolute;
  right: 0;
  margin-right: 111px;
}

.username {
  position: absolute;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: black;
  right: 0;
  margin-right: 30px;
  margin-top: 22px;
  margin-bottom: 22px;
}
/* End of navigation-bar */
#daynum {
  margin-left: 5px;
}

.calendar-content {
  display: flex;
  height: 100%;
  background-color: #ffffff;
  flex-direction: column;
  box-shadow: 2px 2px 3px 0px #d6d6d6;
}

.schedule-content {
  display: flex;
  flex-direction: row;
  height: 100%;
}

h1 {
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
  color: #90c54b;
}

/* Content inside lesson-plan */
.date-container {
  position: relative;
  display: flex;
  height: 48px;
  flex-shrink: 0;
  background-color: #eeeeee;
  padding: 10px;
  margin-bottom: 2px;
}

.date-display {
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 340;
  line-height: 24px;
}

.time {
  height: 38px;
  border-top: 1px solid #d6d6d6;
  border-right: 1px solid #d6d6d6;
  border-left: 1px solid #d6d6d6;
  background: #eee;
}

.time-format {
  color: #757575;
  text-align: right;
  /* body */
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 10px;
  margin-top: 7px;
}

.title-container {
  flex-direction: column;
  height: 30px;
}

.title {
  color: #2f2b2c;
  /* activity title */
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  margin-left: 16px;
  margin-bottom: 3px;
  margin-top: 5px;
}

.activity-type {
  color: #2f2b2c;
  /* activity description */
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  margin-left: 16px;
  margin-top: 2px;
}

.time-duration {
  flex-direction: column;
}

.notes-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: -1px;
  padding-left: 2px;
}

h1.duration {
  display: flex;
  color: #2f2b2c;
  /* activity detail */
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: 300;
  margin-left: 16px;
  height: 20px;
}

</style>