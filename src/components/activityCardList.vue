<template>
  <draggable v-model="activities" :animation="300" tag="ul" :item-key="activity => activity.id" @end="onDragEnd">
    <template v-slot:item="{element: activity, index}">
      <activityCard :activity="activity" :key="index" :isFirst="isFirst(index)" :isLast="isLast(activities, index)" @movedown="onDownButtonClick(activities, index)" @moveup="onUpButtonClick(activities, index)"/>
    </template>
  </draggable>
</template>

<script setup>
  import draggable from 'vuedraggable';
  import {ref, onMounted, defineProps, defineEmits} from 'vue';
  import activityCard from "./activityCard.vue";
  import {db} from '@/firebase.js';
  import {getFirestore, collection, getDocs, doc, updateDoc} from "firebase/firestore";

  let originalActivities = ref([]);
    
  const activities = ref([]);
  const savingMessage = ref('');
  
  const emit = defineEmits();
  
  const props = defineProps({
    disabledState: {
      type: Boolean
    }, 
    savingMessage: {
      type: String
    }
  })
  
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

  // Referencing activities collection in the firestore database
  const activitiesRef = collection(db, 'activities');
  const activitiesDoc = getDocs(activitiesRef);

  // Looping through each document in the 'activitiesDoc' collection, 
  // extracting and pushing their data into the 'activities' array.
  activitiesDoc
    .then(activitiesDoc => {
      activitiesDoc.forEach((doc) => {
        activities.value.push(doc.data());
      })
      
      // Sorting activities by position in day 
      activities.value.sort(function(a, b) {
        return a.positionInDay - b.positionInDay;
      })
    })

  function onDragEnd(event) {
    // Access the index of the dragged item
    const index = event.oldIndex;
    const newIndex = event.newIndex;

    if (index + 1 == newIndex) {
      emit('toggle-button-state', true);
      emit('set-saving-message', 'saving');
  
      // Swap positionInDay values
      const temp = activities.value[index].positionInDay;
      activities.value[index].positionInDay = activities.value[index + 1].positionInDay;
      activities.value[index + 1].positionInDay = temp;
    
      const documentRef = doc(activitiesRef, `${activities.value[index].id}`);
      const documentRef2 = doc(activitiesRef, `${activities.value[index + 1].id}`);
            
      const newData = {
        positionInDay: activities.value[index].positionInDay,
      };
      
      const newData2 = {
        positionInDay: activities.value[index + 1].positionInDay,
      }
      
      updateDoc2(documentRef, newData)
        .then(() => {
          return updateDoc2(documentRef2, newData2);
        })
        .then(() => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'saved');
  
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        })
        .catch((_err) => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'error');
  
          // Swap positionInDay values BACK
          const temp = activities.value[index].positionInDay;
          activities.value[index].positionInDay = activities.value[index + 1].positionInDay;
          activities.value[index + 1].positionInDay = temp;
          
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        });
    }
    else if (index - 1 == newIndex) {
      emit('toggle-button-state', true);
      emit('set-saving-message', 'saving');
      
      // Swap positionInDay values
      const temp1 = activities.value[index].positionInDay;
      activities.value[index].positionInDay = activities.value[index - 1].positionInDay;
      activities.value[index - 1].positionInDay = temp1;
      
      const documentRef = doc(activitiesRef, `${activities.value[index].id}`);
      const documentRef2 = doc(activitiesRef, `${activities.value[index - 1].id}`);
            
      const newData = {
        positionInDay: activities.value[index].positionInDay,
      };
      
      const newData2 = {
        positionInDay: activities.value[index - 1].positionInDay,
      }
      
      updateDoc2(documentRef, newData)
        .then(() => {
          return updateDoc2(documentRef2, newData2);
        })
        .then(() => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'saved');
  
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        })
        .catch((_err) => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'error');

          // Swap positionInDay values BACK
          const temp1 = activities.value[index].positionInDay;
          activities.value[index].positionInDay = activities[index - 1].positionInDay;
          activities.value[index - 1].positionInDay = temp1;
          
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        });
    }
  }

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
      
      const documentRef = doc(activitiesRef, `${activities[index].id}`);
      const documentRef2 = doc(activitiesRef, `${activities[index + 1].id}`);
            
      const newData = {
        positionInDay: activities[index].positionInDay,
      };
      
      const newData2 = {
        positionInDay: activities[index + 1].positionInDay,
      }
      
      updateDoc2(documentRef, newData)
        .then(() => {
          return updateDoc2(documentRef2, newData2);
        })
        .then(() => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'saved');
  
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        })
        .catch((_err) => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'error');

          // Swap positionInDay values BACK
          const temp = activities[index].positionInDay;
          activities[index].positionInDay = activities[index + 1].positionInDay;
          activities[index + 1].positionInDay = temp;
          
          // Swap activities in the array BACK
          const temp1 = activities[index];
          activities[index] = activities[index + 1];
          activities[index + 1] = temp1;
          
          setTimeout(() => {
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

      const documentRef = doc(activitiesRef, `${activities[index].id}`);
      const documentRef2 = doc(activitiesRef, `${activities[index - 1].id}`);
            
      const newData = {
        positionInDay: activities[index].positionInDay,
      };
      
      const newData2 = {
        positionInDay: activities[index - 1].positionInDay,
      }
      
      updateDoc2(documentRef, newData)
        .then(() => {
          return updateDoc2(documentRef2, newData2);
        })
        .then(() => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'saved');
  
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        })
        .catch((_err) => {
          emit('toggle-button-state', false);
          emit('set-saving-message', 'error');

          // Swap positionInDay values BACK
          const temp1 = activities[index].positionInDay;
          activities[index].positionInDay = activities[index - 1].positionInDay;
          activities[index - 1].positionInDay = temp1;
          
          // Swap activities in the array BACK
          const temp = activities[index];
          activities[index] = activities[index - 1];
          activities[index - 1] = temp;
      
          setTimeout(() => {
            emit('set-saving-message', '');
          }, 4000);
        });
    }
  }

  function onDragCard(activities, index) {
    // Save the activity at the old index
    // Remove the activity from the old position
    console.log(index)
    const documentRef = doc(activitiesRef, `${activities.value[index].id}`);
    const documentRef2 = doc(activitiesRef, `${activities.value[index + 1].id}`);
          
    const newData = {
      positionInDay: activities.value[index].positionInDay,
    };
    
    const newData2 = {
      positionInDay: activities.value[index + 1].positionInDay,
    }
    
    updateDoc2(documentRef, newData)
      .then(() => {
        return updateDoc2(documentRef2, newData2);
      })
      .then(() => {
        emit('toggle-button-state', false);
        emit('set-saving-message', 'saved');

        setTimeout(() => {
          emit('set-saving-message', '');
        }, 4000);
      })
      .catch((_err) => {
        emit('toggle-button-state', false);
        emit('set-saving-message', 'error');

        // Swap positionInDay values BACK
        const temp = activities[index].positionInDay;
        activities[index].positionInDay = activities[index + 1].positionInDay;
        activities[index + 1].positionInDay = temp;
        
        // Swap activities in the array BACK
        const temp1 = activities[index];
        activities[index] = activities[index + 1];
        activities[index + 1] = temp1;
        
        setTimeout(() => {
          emit('set-saving-message', '');
        }, 4000);
      });
  }
  
  function updateDoc2(documentRef, newData) { 
    if (!navigator.onLine) {
      return new Promise((resolve, reject) => {
        // Simulate network delay when error occurs
        setTimeout(() => {
          reject();
        }, 40);
      });
    }
    else {
      return updateDoc(documentRef, newData);
    }
  }
  
</script>