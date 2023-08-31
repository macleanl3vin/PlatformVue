<template>
  <div class="activity-card" :style="activityCardStyles(activity)">
    <div class="buttonDownBox" @click="moveDown" :style="buttonStyles(activity, false, isFirst, isLast)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="button-down">
        <path d="M9.33325 12.6667L15.9999 19.3334L22.6666 12.6667H9.33325Z" fill-opacity="0.8" :style="buttonDownPathStyle(isLast)"/>
      </svg>
    </div>

    <div class="buttonUpBox" @click="moveUp" :style="buttonStyles(activity, true, isFirst, isLast)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="button-up">
        <path d="M9.33325 19.3334L15.9999 12.6667L22.6666 19.3334H9.33325Z" fill-opacity="0.8" :style="buttonUpPathStyle(isFirst)"/>
      </svg>
    </div>
    
    <div class="title-container">
      <h1 class="title">{{ activity.title }}</h1>
      <h1 class="activity-type">{{ activity.type.replace(/_/g, " ").replace(/\b\w/g, letter => letter.toUpperCase()) }} </h1>
    </div>
    <div class="time-duration">
      <h1 class="duration">{{ activity.durationMinutes + " min" }}</h1>
    </div>
  </div>  
</template>

<script setup>
  import {ref, onMounted, defineProps, defineEmits} from 'vue';
  
  const emit = defineEmits();
  
  const props = defineProps({
    activity: {
      type: Object
    },
    isFirst: {
      type: Boolean
    }, 
    isLast: {
      type: Boolean
    }, 
    index: {
      type: Object
    }
  });

  const index = ref(props.index);
  
  const move = () => {
    emit('moveup');
  };
  
  const moveUp = () => {
    emit('moveup');
  };
  
  const moveDown = () => {
    emit('movedown');
  };  
  
  function activityCardStyles(activity) {
    const style = {height: `${(activity.durationMinutes/5) * 38}px`};
  
    if (activity.type === 'instruction' || activity.type === 'teacher_coding_exercise') {
      style['background-color'] = '#c890c1';
    } 
    else if (activity.type === 'student_coding_exercise') {
      style['background-color'] = '#66cff4';
    } 
    else {
      style['background-color'] = '#fa967f';
    }
    return style;
  }
  
  function buttonStyles(activity, isUpButton, isFirst, isLast) {
    const style = {};
    style['borderColor'] = 'rgba(47, 43, 44, 0.25)';
    
    if (isUpButton && !isFirst || !isUpButton && !isLast) {
      if (activity.type === 'instruction' || activity.type === 'teacher_coding_exercise') {
        style['background-color'] = '#BA6FB1';
        style['borderColor'] = 'rgba(47, 43, 44, 0.25)';
      } 
      else if (activity.type === 'student_coding_exercise') {
        style['background-color'] = '#3bbeed';
        style['borderColor'] = 'rgba(47, 43, 44, 0.25)';
      } 
      else {
        style['background-color'] = '#F87B5E';
        style['borderColor'] = 'rgba(47, 43, 44, 0.25)';
      }
    }
    return style;
  }
  
  function buttonDownPathStyle(isLast) {
    const style = {};
    style['fill'] = '#2F2B2C';
    
    if (isLast) {
      style['fill-opacity'] = '0.25';
    } 
    return style; 
  };
  
  function buttonUpPathStyle(isFirst) {
    const style = {};
    style['fill'] = '#2F2B2C';
    
    if (isFirst) {
      style['fill-opacity'] = '0.25';
    }
    return style; 
  };
</script>

<style>
  .activity-card {
    display: flex;
    flex-wrap: wrap;
    border: 3px solid #ffffff;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
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
