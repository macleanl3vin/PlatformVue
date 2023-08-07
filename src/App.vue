<script setup>
  import navBar from './components/navBarTemplate.vue';
  import lessonPlan from './components/lessonPlanTemplate.vue';
  import lessonNotes from './components/lessonNotesTemplate.vue';
</script>

<template>
  <navBar/>
  <div class="cards-container">
    <lessonPlan/>
    <lessonNotes/>
  </div>
</template>

