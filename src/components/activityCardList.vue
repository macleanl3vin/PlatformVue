<template>
  <activityCard v-for="(activity, index) in activities" :activity="activity" :activities="activities" :index="index" :key="index" @movedown="onDownButtonClick(activities, index)" @moveup="onUpButtonClick(activities, index)"/>
</template>

<script setup>
  import {ref, onMounted, defineProps, defineEmits} from 'vue';
  import activityCard from "./activityCard.vue";
  const activities = ref([]);
  const savingMessage = ref('');
  let originalActivities = ref([]);
  
  const props = defineProps({
    disabledState: {
      type: Boolean
    }, 
    savingMessage: {
      type: String
    }
  })

  const emit = defineEmits();
  
  fetch('https://apprenticeship-2022-summer-backend.fly.dev/activities/')
    // Receives reponse as parameter then converts to JSON format
    .then((response) => response.json())
    .then((data) => {
      activities.value = data;
      
      // Sorting activities by position in day 
      activities.value.sort(function(a, b) {
        return a.positionInDay - b.positionInDay;
      })
      
  });
  
  function onDownButtonClick(activities, index) {
    if (index < activities.length - 1) {
      emit('toggle-button-state', true);
      emit('set-saving-message', 'saving')

      // Swap positionInDay values
      const temp = activities[index].positionInDay;
      activities[index].positionInDay = activities[index + 1].positionInDay;
      activities[index + 1].positionInDay = temp;
      // Swap activities in the array
      const temp1 = activities[index];
      activities[index] = activities[index + 1];
      activities[index + 1] = temp1;
      
      fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[index].id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          'positionInDay': activities[index].positionInDay,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((pos) => {
          return fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[index + 1].id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              'positionInDay': activities[index + 1].positionInDay,
            }),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((pos) => {
              emit('toggle-button-state', false);
              emit('set-saving-message', 'saved');
              
              setTimeout(() => {
                emit('set-saving-message', '')
              }, 4000);
            });
        })
        .catch((err) => {
          emit('set-saving-message', 'error')
          emit('toggle-button-state', false);
          // Swap positionInDay values
          const temp = activities[index].positionInDay;
          activities[index].positionInDay = activities[index + 1].positionInDay;
          activities[index + 1].positionInDay = temp;
          // Swap activities in the array
          const temp1 = activities[index];
          activities[index] = activities[index + 1];
          activities[index + 1] = temp1;
          
          setTimeout(function() {
            emit('set-saving-message', '')
          }, 4000);
        });
    }
  }
  
  function onUpButtonClick(activities, index) {
    if (index > 0) {
      emit('toggle-button-state', true);
      emit('set-saving-message', 'saving')
      // Swap activities in the array
      const temp = activities[index];
      activities[index] = activities[index - 1];
      activities[index - 1] = temp;
      
      fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[index].id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          'positionInDay': activities[index - 1].positionInDay,
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((pos) => {
          return fetch(`https://apprenticeship-2022-summer-backend.fly.dev/activities/${activities[index - 1].id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              'positionInDay': activities[index].positionInDay,
            }),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((pos) => {
              emit('toggle-button-state', false);
              emit('set-saving-message', 'saved')
              setTimeout(() => {
                emit('set-saving-message', '')
              }, 4000);
            });
        })
        .catch((err) => {
           emit('set-saving-message', 'error')
          emit('toggle-button-state', false);
          
          setTimeout(function() {
            emit('set-saving-message', '')
          }, 4000);
        });
    }
  }
  
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