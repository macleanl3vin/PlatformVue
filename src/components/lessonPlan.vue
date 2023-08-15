<script setup>
  import activityCardList from "./activityCardList.vue";
  import {ref, onMounted} from 'vue';
  import {db} from '@/firebase.js';
  let savingMessage = ref('');
  let disabledState = ref(false);
  
  function setUpPlanPage() {
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

    drawCurrentDate();
  }
  onMounted(setUpPlanPage);
    
  function activityCardClasses() {
    const classes = ['activity-cards'];
    if (disabledState.value) {
      classes.push('activity-cards--disabled');
    }
    return classes;
  }
    
  function toggleDisabledState(newState) {
    disabledState.value = newState;
  }

  function savingState(newState) {
    savingMessage.value = newState;
  }
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
        
        <h1 v-show="savingMessage == 'saving'" class="save-message">Saving...</h1>
        <h1 v-show="savingMessage == 'saved'" class="saved-message"><img src="./icons/done.svg">Saved</h1>
        <h1 v-show="savingMessage == 'error'" class="error-message"><img src="./icons/warning_amber.svg">Save Error</h1>
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
        <div :class="activityCardClasses()">
          <activityCardList :disabledState="disabledState" @toggle-button-state="toggleDisabledState" :savingMessage="savingMessage" @set-saving-message="savingState"/> 
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
    position: relative;
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