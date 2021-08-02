<template>
  <div class="content-item">
    <input type="checkbox" :id="item">
    <label :for="item">{{ item }}</label>
    <input type="text"/>
  </div>
</template>

<script>
export default {
  name: "contentItem",
  props: {
    item: {
      required: true,
      type: String
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