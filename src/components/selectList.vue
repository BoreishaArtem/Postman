<template>
  <select class="select">
    <option :value="optionItem.value" v-for="(optionItem, idx) in options" :key="idx">{{ optionItem.title }}</option>
  </select>
</template>

<script>
export default {
  name: "selectList",
  props: {
    options: {
      required: true,
      type: Array,
    }
  }
}
</script>

<style scoped>

</style>