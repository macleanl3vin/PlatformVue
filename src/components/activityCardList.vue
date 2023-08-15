<template>
  <activityCard v-for="(activity, index) in activities" :activity="activity" :activities="activities" :index="index" :key="index" :isFirst="isFirst(index)" :isLast="isLast(activities, index)" @movedown="onDownButtonClick(activities, index)" @moveup="onUpButtonClick(activities, index)"/>
</template>

<script setup>
  import {ref, onMounted, defineProps, defineEmits} from 'vue';
  import activityCard from "./activityCard.vue";
  import { db } from '@/firebase.js';
  const activities = ref([]);
  const savingMessage = ref('');
  let originalActivities = ref([]);
  let index = ref(props.index)
                 
  function isFirst(index) {
    if (index === 0) {
      return true;
    }
    return false;
  };
  
  function isLast(activities, index) {
    if (index === activities.length - 1) {
      return true;
    }
    return false;
  };
  
  // const activitiesCollection = db.collection('activities');

  // activitiesCollection.onSnapshot(snapshot => {
  //   const data = [];

  //   snapshot.forEach(doc => {
  //     data.push({ id: doc.id, ...doc.data() });
  //   });

  //   activities.value = data;
  // });  
  
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
      emit('set-saving-message', 'saving');

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
                emit('set-saving-message', '');
              }, 4000);
            });
        })
        .catch((err) => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'error');
          
          // Swap positionInDay values
          const temp = activities[index].positionInDay;
          activities[index].positionInDay = activities[index + 1].positionInDay;
          activities[index + 1].positionInDay = temp;
          
          // Swap activities in the array
          const temp1 = activities[index];
          activities[index] = activities[index + 1];
          activities[index + 1] = temp1;
          
          setTimeout(function() {
            emit('set-saving-message', '');
          }, 4000);
        });
    }
  }
  
  function onUpButtonClick(activities, index) {
    if (index > 0) {
      emit('toggle-button-state', true);
      emit('set-saving-message', 'saving');
      
      // Swap positionInDay values
      const temp1 = activities[index].positionInDay;
      activities[index].positionInDay = activities[index - 1].positionInDay;
      activities[index - 1].positionInDay = temp1;
      
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
              emit('set-saving-message', 'saved');
              
              setTimeout(() => {
                emit('set-saving-message', '')
              }, 4000);
            });
        })
        .catch((err) => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'error');
          
          // Swap positionInDay values
          const temp1 = activities[index].positionInDay;
          activities[index].positionInDay = activities[index - 1].positionInDay;
          activities[index - 1].positionInDay = temp1;
          
          // Swap activities in the array
          const temp = activities[index];
          activities[index] = activities[index - 1];
          activities[index - 1] = temp;
          
          setTimeout(function() {
            emit('set-saving-message', '');
          }, 4000);
        });
    }
  }
</script>

