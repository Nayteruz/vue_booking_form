<template>
  <Transition name="popup">
  <div class="pop" v-if="props.is_show">
    <div class="pop--inner">
      <div class="pop--block">
        <button class="pop--close" @click.prevent="closeForm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
          </svg>
        </button>
        <h2>
          <slot name="title"></slot>
        </h2>
        <slot name="default"></slot>
      </div>
    </div>
  </div>
  </Transition>
</template>

<script setup>
  import {defineEmits, defineProps} from 'vue';

  const emit = defineEmits(['closeBlock']);
  const props = defineProps({
    is_show: {
      type: Boolean,
      default: false,
    }
  })

  const closeForm = () => {
    emit('closeBlock');
  }
</script>

<style scoped lang="scss">

  $red:#c30909;

  .pop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(#000,.3);
    overflow: hidden auto;
    z-index: 999;

    &--inner {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
    }
    &--block {
      position: relative;
      width: 100%;
      max-width: 600px;
      min-height: 200px;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 4px 4px 7px rgba(#000,.3);
    }

    &--close {
      position: absolute;
      right: 10px;
      top: 10px;

      width: 30px;
      height: 30px;
      border-radius: 50%;
      border:none;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: $red;
      svg {
        max-width: 100%;
        max-height: 100%;
        fill:#fff;
      }

      &:hover {
        background: lighten($red, 10%);
      }
      &:active {
        background: darken($red, 10%);
      }
    }
  }

  h2 {
    margin-bottom: 15px;
    font-size: 22px;
  }

  .popup-enter-active,
  .popup-leave-active {
    transition: opacity 0.5s ease;
  }

  .popup-enter-from,
  .popup-leave-to {
    opacity: 0;
  }

</style>