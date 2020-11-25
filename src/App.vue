<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
$body-overflow-y: auto;

@import "node_modules/bulma/bulma";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>
