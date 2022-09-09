<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/service-list">Список услуг</router-link> |
    <router-link to="/master-list">Список специалистов</router-link>
  </nav>
  <router-view/>
</template>

<script setup>
  import {useBookingStore} from "@/store";
  import {onMounted} from "vue";

  const store = useBookingStore();

  onMounted(()=>{
    store.getFromLocal();
  })

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
$red:#c30909;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
#app {


  margin: 0 auto;
  max-width: 786px;
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;

}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
