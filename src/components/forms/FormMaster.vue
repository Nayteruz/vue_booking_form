<template>
  <form @submit.prevent="addMaster">
    <div class="form-row">
      <span class="name">Название услуги</span>
      <input type="text" v-model="default_master.name" placeholder="Название услуги">
    </div>
    <div class="form-row">
      <span class="name">Услуги</span>
      <div class="masters-list">
        <label v-for="service in services" :key="service.id" class="service">
          <input type="checkbox" name="services" :value="service.id" v-model="default_master.services">
          <span class="check">{{ service.name }}</span>
        </label>
      </div>
    </div>
    <div class="buttons">
      <button type="button" @click.prevent="closeForm">Отмена</button>
      <button type="submit">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
  import {computed, defineEmits, defineProps, onMounted, reactive} from 'vue';
  import {useBookingStore} from "@/store";

  const emit = defineEmits(['formSend'])
  const props = defineProps(['master']);

  const store = useBookingStore();
  const services = computed(() => store.services);
  const selected_master = computed(() => props.master);

  const default_master= reactive({
    id: -1,
    name:'',
    services:[]
  });

  onMounted(() => {
    if(selected_master.value !== null) {
      for (let item of Object.entries(selected_master.value)){
        default_master[item[0]] = item[1];
      }
    }
  })

  const closeForm = () => {
    emit('formSend');
  }

  const addMaster = () => {
    if(default_master.id === -1){
      default_master.id = Date.now();
    }
    store.addMaster(default_master);
    emit('formSend');
  }

</script>

<style scoped lang="scss">
  $grey:#9aaeb9;
  $red:#c30909;
  $green:#3d8b1f;

  form {
    display: flex;
    flex-direction: column;
    gap:20px;

    .form-row {
      display: flex;
      flex-direction: column;
      gap:5px;

      span.name {
        display: block;
        font-size: 16px;
        font-weight: bold;
      }

      input[type="text"] {
        height: 45px;
        background: rgba($grey,0.2);
        border:none;
        border-radius: 10px;
        font-size: 18px;
        padding: 5px 10px;
      }

    }

    .masters-list {
      display: flex;
      flex-wrap: wrap;
      gap:2px 5px;

      .service {
        display: block;
        cursor: pointer;
        user-select: none;
        .check {
          display: block;
          padding: 8px 10px;
          background: rgba($green,.5);
          border-radius: 5px;
          color: #fff;
          font-size: 16px;
        }

        input {
          display: none;
          &:checked ~ .check {
            background: rgba($green,.9);
          }
        }
      }
    }

    .buttons {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      gap:25px;

      button {
        padding: 5px 10px;
        font-size: 22px;
        background: $green;
        border:none;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        width: 140px;
        &:hover {
          background: lighten($green, 10%);
        }
        &:active {
          background: darken($green, 10%);
        }

        &[type="button"] {
          background: $red;
          &:hover {
            background: lighten($red, 10%);
          }
          &:active {
            background: darken($red, 10%);
          }
        }
      }
    }
  }

</style>