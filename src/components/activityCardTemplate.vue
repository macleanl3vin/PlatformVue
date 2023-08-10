<template>
  <div class="activity-card" :style="activityCardStyles(activity)">
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
      <h1 class="title">{{ activity.title }}</h1>
      <h1 class="activity-type">{{ activity.type.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase()) }} </h1>
    </div>
    <div class="time-duration">
      <h1 class="duration">{{ activity.durationMinutes + ' min' }}</h1>
    </div>
  </div>  
</template>

<script setup>
  import {ref, onMounted, defineProps} from 'vue';
  
  const props = defineProps({
    activity: {
      type: Object
    },
  });
  function activityCardStyles(activity) {
    const style = {height: `${(activity.durationMinutes/5) * 38}px`};
  
    if (activity.type === 'instruction' || activity.type === 'teacher_coding_exercise') {
      style['background-color'] = '#c890c1';
    } else if (activity.type === 'student_coding_exercise') {
      style['background-color'] = '#66cff4';
    } else {
      style['background-color'] = '#fa967f';
    }
    return style;
  }
</script>

