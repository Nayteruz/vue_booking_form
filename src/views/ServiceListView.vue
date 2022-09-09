<template>
  <div class="service-list">
    <h2>Услуги</h2>
    <ul v-if="services.length">
      <TransitionGroup name="list" tag="ul">
      <li v-for="service in services" :key="service.id">
        <span class="name">{{service.name}}</span>
        <button class="edit" @click.prevent="editService(service)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
          </svg>
        </button>
        <button class="delete" @click.prevent="deleteService(service)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
          </svg>
        </button>
      </li>
      </TransitionGroup>
    </ul>
    <h3 v-else>Список услуг пуст</h3>
    <div class="addButton">
      <button @click="addService">Добавить услугу</button>
    </div>
    <PopupBlock @closeBlock="show_form=false" :is_show="show_form">
      <template #title>{{ form_title }}</template>
      <FormService :service="selected_service" @formSend="show_form = false" />
    </PopupBlock>
  </div>
</template>

<script setup>
  import {computed, ref} from "vue";
  import {useBookingStore} from "@/store";
  import PopupBlock from '@/components/ui/PopupBlock';
  import FormService from "@/components/forms/FormService";

  const store = useBookingStore();
  const services = computed(() => store.services);
  const selected_service = ref(null);
  const show_form = ref(false);
  const form_title = ref('Добавить услугу');

  const deleteService = (service) => {
    store.deleteService(service);
  }

  const addService = () => {
    selected_service.value = null;
    show_form.value = true;
    form_title.value = 'Добавить услугу';
  }

  const editService = (service) => {
    show_form.value = true;
    selected_service.value = service;
    form_title.value = 'Изменить услугу';
  }

</script>

<style scoped lang="scss">

  $grey:#9aaeb9;
  $red:#c30909;
  $green:#3d8b1f;

  h2 {
    margin-bottom: 15px;
  }
  h3 {
    margin-bottom: 10px;
    color:$grey;
  }

  .addButton {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      background: $green;
      border:none;
      border-radius: 10px;
      font-size: 20px;
      cursor: pointer;
      padding: 10px 20px;
      color: #fff;
      font-weight: bold;

      &:hover {
        background: lighten($green, 10%);
      }
      &:active {
        background: darken($green, 10%);
      }
    }
  }

  .service-list {
    margin-top: 20px;
    margin-bottom: 20px;

    ul {
      display: flex;
      flex-direction: column;
      gap:5px 10px;
      li {
        display: flex;
        align-items: center;
        gap:10px;
        padding: 6px 10px 6px 20px;
        background-color: rgba($grey,.2);
        border-radius: 10px;
        user-select: none;
        span.name {
          font-size: 16px;
          font-weight: bold;
          flex:1 1 auto;
        }
        button {
          flex: 0 0 auto;
          width: 30px;
          height: 30px;
          background:none;
          border:none;
          border-radius: 10px;
          cursor: pointer;
          padding: 5px;

          svg {
            width: 100%;
            height: 100%;
            fill:#fff;
          }

          &.edit {
            background: $grey;
            &:hover {
              background: lighten($grey, 10%);
            }
            &:active {
              background: darken($grey, 10%);
            }
          }
          &.delete {
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
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }



</style>