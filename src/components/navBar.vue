<template>
  <html lang="en">
    <body>
      <!-- Nav bar -->
      <nav>
        <img src="./icons/ts_logo.svg" class="logo"/>
        <img src="./icons/Ellipse 1.svg" class="ellipse"/>
        <img src="./icons/person.svg" class="person"/>
        <h1 class="username">Rhonda</h1>
      </nav>
    </body>
  </html>
</template>

<style>
  nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    gap: 0.5rem;
    background-color: #ffffff;
    height: 64px;
    box-shadow: 2px 2px 3px 0px #d6d6d6;
  }
  /* Navigation-bar */
  .logo {
    width: 171px;
    height: 24px;
    flex-shrink: 0;
    position: absolute;
    left: 0;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .ellipse {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    position: absolute;
    right: 0;
    margin-top: 16px;
    margin-bottom: 16px;
    margin-right: 106px;
  }
  
  .person {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 0;
    margin-right: 111px;
  }
  
  .username {
    position: absolute;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: black;
    right: 0;
    margin-right: 30px;
    margin-top: 22px;
    margin-bottom: 22px;
  }
  /* End of navigation-bar */
</style>