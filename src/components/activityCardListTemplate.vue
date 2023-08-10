<template>
  <activityCard v-for="activity in activities" :activity="activity"/>
</template>

<script setup>
  import {ref, onMounted, defineProps} from 'vue';
  import activityCard from "./activityCardTemplate.vue";
  const activities = ref([]);
  
  fetch('https://apprenticeship-2022-summer-backend.fly.dev/activities/')
    // Receives reponse as parameter then converts to JSON format
    .then((response) => response.json())
    .then((data) => {
      activities.value = data;
  });
  
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