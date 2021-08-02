<template>
  <ul>
    <li v-for="(listItem, idx) in list" :key="idx" @click="$emit('selectListItem', listItem)">{{ listItem.title }}</li>
  </ul>
</template>

<script>
export default {
  name: "functionList",
  props: {
    list: {
      required: true,
      type: Array,
    }
  }
}
</script>

<style lang="scss" scoped>
ul > li {
  margin-bottom: 2rem;
  cursor: pointer;
}
</style>