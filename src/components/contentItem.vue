<template>
  <div class="content-item">
    <input type="checkbox" :id="item.title" @click="changeCheckedStatus(item)" :checked="item.checked">
    <label :for="item.title">{{ clearStrFromSymbols(item.title) }}</label>
    <input type="text" v-model="item.modelValue" :disabled="!item.checked" @input="inputEvent(item)"/>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import cloneObject from '../actions/cloneObject'


export default {
  name: "contentItem",
  props: {
    item: {
      required: true,
      type: Object
    },
  },
  setup(props, { emit }) {
    const clearStrFromSymbols = str => str.replace(/[^a-zа-яё*]/gi, '')
    const copiedObject = ref(null)

    watch(props.item.parameters, (val) => {
      props.item.modelValue = val.join('')
    })

    const changeCheckedStatus = item => {
      item.checked = !item.checked
      if (!item.checked) {
          item.modelValue = ''
          emit('updatedInput', item)
      } else {
        if (copiedObject.value) {
          item.modelValue = copiedObject.value.modelValue
          emit('updatedInput', copiedObject.value)
        }
      }
    }

    const inputEvent = item => {
      emit('updatedInput', item)
      copiedObject.value = cloneObject(item)
    }

    return {
      clearStrFromSymbols,
      changeCheckedStatus,
      inputEvent
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  input:first-child {
    margin-right: 1rem;
  }
  label {
    min-width: 20rem;
  }
  input:last-child {
    width: 100%;
  }
}
</style>
