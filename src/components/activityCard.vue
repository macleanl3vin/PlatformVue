<template>
  <div class="activity-card" :style="activityCardStyles(activity)">
    <div class="buttonDownBox" @click="moveDown" :style="buttonStyles(activity, index, false, activities)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="button-down">
        <path d="M9.33325 12.6667L15.9999 19.3334L22.6666 12.6667H9.33325Z" fill-opacity="0.8" :style="buttonDownPathStyle(activities, index)"/>
      </svg>
    </div>

    <div class="buttonUpBox" @click="moveUp" :style="buttonStyles(activity, index, true, activities)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="button-up">
        <path d="M9.33325 19.3334L15.9999 12.6667L22.6666 19.3334H9.33325Z" fill-opacity="0.8" :style="buttonUpPathStyle(activities, index)"/>
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
  import {ref, onMounted, defineProps, defineEmits} from 'vue';

  const props = defineProps({
    activity: {
      type: Object
    },
    activities: {
      type: Array
    },
    index: {
      type: Number
    },
  });
  
  const emit = defineEmits();

  const index = ref(props.index);

  const moveUp = () => {
    emit('moveup', index);
  };
  
  const moveDown = () => {
    emit('movedown', index);
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
  
  function buttonStyles(activity, index, isUpButton, activities) {
    const style = {};
    style['borderColor'] = 'rgba(47, 43, 44, 0.25)';
    
    if (isUpButton && index != 0 || !isUpButton && index != activities.length - 1) {
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
  
  function buttonDownPathStyle(activities, index) {
    const style = {};
    style['fill'] = '#2F2B2C';
    
    if (index === activities.length - 1) {
      style['fill-opacity'] = '0.25';
    } 
    return style; 
  };
  
  function buttonUpPathStyle(activities, index) {
    const style = {};
    style['fill'] = '#2F2B2C';
    
    if (index === 0) {
      style['fill-opacity'] = '0.25';
    }
    return style; 
  };
</script>

