<script setup>
  import {marked} from 'marked';
  import {ref, onMounted} from 'vue';
  
  let savingMessage = ref('');
  let currentMarkdownString = ref(null);
  let inEditMode = ref(false);
  let originalMarkdownString = '';
  let disabledState = ref(false);

  function buttonContainerClasses() {
    const classes = ['button-container']
    if (inEditMode.value) {
      classes.push('button-container--edit', 'button-container--save', 'button-container--cancel');
    }
    if(disabledState.value){
      classes.push('button-container--disabled');
    }
    return classes;
  }

  function editButton() {
    inEditMode.value = true;
    
    savingMessage.value = '';
  };    

  function saveButton() {
    savingMessage.value = 'saving';
    disabledState.value = true;

    fetch('https://apprenticeship-2022-summer-backend.fly.dev/lesson-note', {
      method: 'PATCH',
      body: JSON.stringify({
        'contentMarkdown': currentMarkdownString.value,
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((response) => response.json())
      .then((_pos) => {
        savingMessage.value = '';
        savingMessage.value = 'saved';
        disabledState.value = false;
        inEditMode.value = false;
   
        setTimeout(function() {
          savingMessage.value = '';
        }, 4000);
      })
      .catch((_err) => {
        savingMessage.value = '';
        savingMessage.value = 'error';
        
        currentMarkdownString.value = originalMarkdownString;
        
        setTimeout(function() {
          savingMessage.value = '';
        }, 4000);
      }); 
  }

  function cancelButton() { 
    let shouldCancel = confirm("Are you sure you want to cancel? Your changes will not be saved.");
    
    if (shouldCancel) {
      currentMarkdownString.value = originalMarkdownString;
      inEditMode.value = false;
    }
  };
  
  function drawLessonNotes() {
    // Disable deprecation warnings introduced in marked v5
    // https://github.com/markedjs/marked/releases/tag/v5.0.0
    marked.use({mangle: false, headerIds: false});
    
    return fetch('https://apprenticeship-2022-summer-backend.fly.dev/lesson-note')
      .then((response) => response.json())
      .then((data) => {
        originalMarkdownString = data.contentMarkdown;
        
        currentMarkdownString.value = originalMarkdownString;
      })
  };
  
  function markdownAsHtml() {
    if (currentMarkdownString.value === null) {
        return null;
    }
    return marked.parse(currentMarkdownString.value);
  }  
  onMounted(drawLessonNotes);
</script>

<template>
  <div class="section-card" style="position: relative;">
    <div class="notes-header">
      <h1>Lesson Notes</h1>
      <div :class="buttonContainerClasses()">
        <div @click="editButton()" class="edit-button">
          <img src="./icons/arrow_up.svg" class="edit"/>
          <img src="./icons/arrow_up1.svg" class="edit-hover"/>
        </div>
        
        <div @click="saveButton()" class="save-button">
          <h1 class="save-text">SAVE</h1>
        </div>

        <div @click="cancelButton()" class="cancel-button">
          <h1 class="cancel-text">CANCEL</h1>
        </div>
      </div>
      <div class='message-container'>  
        <h1 v-show="savingMessage == 'saving'" class="save-message">Saving...</h1>
        <h1 v-show="savingMessage == 'saved'" class="saved-message"><img src="./icons/done.svg">Saved</h1>
        <h1 v-show="savingMessage == 'error'" class="error-message"><img src="./icons/warning_amber.svg">Save Error</h1>
      </div>
    </div>

    <div class="notes-content" style="overflow-y: scroll;">
      <div v-if="currentMarkdownString === null"></div>
      <textarea v-else-if="inEditMode" id="input" rows='50' v-model="currentMarkdownString">{{currentMarkdownString}}</textarea>
      <div v-else-if="!inEditMode" v-html="markdownAsHtml()"></div>
      <div v-if="!inEditMode" class="notes-fadeout"></div>
    </div> 
  </div>
</template>  

<style>
  /* Content inside lesson-notes */
  .notes-content h1 {
    display: flex;
    height: 48px;
    flex-shrink: 0;
    background-color: #eeeeee;
    padding: 10px;
    font-size: 29px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 340;
    line-height: 24px;
    color: black;
    margin-bottom: 12px;
    margin-top: 2px;
  }
  
  .notes-content h2 {
    display: flex;
    flex-direction: column;
    color: #757575;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    margin-left: 10px;
    padding-bottom: 7px;
    border-bottom: 1px solid #90c54b;
    margin-bottom: 2px;
  }
  
  .notes-content li {
    color: #757575;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 5px;
  }
  
  .notes-content ul {
    margin-bottom: -1px;
  }
  
  .notes-content h3 {
    color: #757575;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 10px;
    margin-bottom: -5px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 90.38%);
  }
  
  .notes-content code {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    font-family: monospace;
  }
  
  .notes-content th, 
  .notes-content td{
    vertical-align: top;
    color: #757575;
    text-align: start;
    padding: 9px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .notes-content table {
    text-align: start;
    padding-bottom: 12px;
  }
  
  .notes-content p {
    margin-left: 10px;
    color: #757575;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .notes-fadeout {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 58px;
    flexShrink: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 39.38%);
  }
  
  #input {
    display: flex;
    /* margin-top: 13px; */
    height: 100%;
    padding: 20px 20px 0px 20px;
    flex-direction: column;
    font-size: 17px;
    resize: none;
    border: 1px solid #D6D6D6;
    border-radius: 3px;
  }
  
  #input:focus {
    outline: #D6D6D6;
  }
  
  .notes-header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  /* Button content */
  .button-container {
    display: flex;
    position: absolute;
    justify-content: space-between;
    right: 0;
    top: 0;
    margin-top: 10px;
    flex-direction: row-reverse;
    gap: 8px;
  }
  
  .edit {
    position: relative;
    margin: 10px;
    width: 18px;
    height: 18px;
    display: block;
  }
  .edit-hover {
    position: relative;
    margin: 10px;
    width: 18px;
    height: 18px;
    display: none;
  }
  .edit-button{
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 28px;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    border: 1px solid #EEEEEE;
    border-radius: 3px;
    visibility: visible;
  }
  
  .edit-button:hover .edit{
    display: none;
  }
  .edit-button:hover .edit-hover {
    display: block;
  }
  .edit-button:hover {
    border: 1px solid #2F2B2C;
    background: rgba(117, 117, 117, 0.40);
  }
  
  .button-container--edit .edit-button {
    visibility: hidden;
  }
  /* End of edit button */
  
  .save-button {
    display: flex;
    height: 34px;
    padding: 7px 10px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 3px;
    border: 1px solid #D6D6D6;
    background: #EEE;  
    margin-right: 20px;
    margin-top: 30px;
    visibility: hidden;
  }
  .save-text {
    color:#2F2B2C;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
  
  .cancel-button {
    display: flex;
    height: 34px;
    padding: 7px 10px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 3px;
    border: 1px solid #D6D6D6;
    margin-top: 30px;
    visibility: hidden;
  }
  .cancel-text {
    color:#757575;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
  }
  
  .button-container--save .save-button, 
  .button-container--cancel .cancel-button {
    visibility: visible;
  }
  
  .button-container:not(.button-container--disabled) .cancel-button:hover, .button-container:not(.button-container--disabled)  .save-button:hover {
    border: 1px solid #2F2B2C;
    background: rgba(117, 117, 117, 0.40);
  }
  
  .button-container:not(.button-container--disabled) .cancel-button:hover .cancel-text, .button-container:not(.button-container--disabled) .save-button:hover .save-text {
    color: #2f2b2c;
  }
  
  /* Saving message for save button */
  .message-container {
    position: absolute;
    right: 0;
    height: 50px;
    width: 100px;
    margin-right: 180px;
  }
  
  .message-container .save-message {
    display: absolute;
    right: 0;
    margin-top: 20px;
    margin-right: 0px;
    font-size: 15px;
  }
  .message-container--saving .save-message {
    visibility: visible;
  }
  
  .button-container--disabled .cancel-button,
  .button-container--disabled .save-button {
    background-color: transparent !important;
    pointer-events: none;
  }
  .button-container--disabled .save-text {
    color:#757575;
  }
  
  .message-container .saved-message {
    display: absolute;
    right: 0;
    margin-top: 20px;
    margin-right: -100px;
    font-size: 15px;
  }
  .message-container--saved .saved-message {
    visibility: visible;
  }
  
  .message-container .error-message {
    display: absolute;
    right: 0;
    margin-top: 20px;
    margin-right: 0px;
    font-size: 15px;
  }
  .message-container--error .error-message {
    visibility: visible;
  }
</style>