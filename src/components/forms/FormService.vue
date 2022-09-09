<template>
  <form @submit.prevent="addService">
    <div class="form-row">
      <span class="name">Название услуги</span>
      <input type="text" v-model="default_service.name" placeholder="Название услуги">
    </div>
    <div class="form-row">
      <span class="name">Специалисты</span>
      <div class="masters-list">
        <label v-for="master in masters" :key="master.id" class="master">
          <input type="checkbox" name="masters" :value="master.id" v-model="default_service.masters">
          <span class="check">{{ master.name }}</span>
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
  const props = defineProps(['service']);

  const store = useBookingStore();
  const masters = computed(() => store.masters);
  const selected_service = computed(() => props.service);

  const default_service = reactive({
    id: -1,
    name:'',
    masters:[]
  });

  onMounted(() => {
    if(selected_service.value !== null) {
      for (let item of Object.entries(selected_service.value)){
        default_service[item[0]] = item[1];
      }
    }
  })

  const closeForm = () => {
    emit('formSend');
  }

  const addService = () => {
    if(default_service.id === -1){
      default_service.id = Date.now();
    }
    store.addService(default_service);
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

      .master {
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