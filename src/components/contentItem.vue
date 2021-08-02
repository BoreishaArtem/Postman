<template>
  <div class="content-item">
    <input type="checkbox" :id="item.title" @click="item.checked = !item.checked" :checked="item.checked">
    <label :for="item.title">{{ item.title }}</label>
    <input type="text" v-model="item.modelValue" @input="item.checked ? $emit('updatedInput', item) : item.modelValue = ''"/>
  </div>
</template>

<script>
export default {
  name: "contentItem",
  props: {
    item: {
      required: true,
      type: Object
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