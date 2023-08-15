<script setup>
  import navBar from './components/navBar.vue';
  import lessonPlan from './components/lessonPlan.vue';
  import lessonNotes from './components/lessonNotes.vue';
</script>

<template>
  <navBar/>
  <div class="cards-container">
    <lessonPlan/>
    <lessonNotes/>
  </div>
</template>


