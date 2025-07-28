<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'My-input',
  props: {
    inputName: String,
    inputLabel: String,
  },
  data() {
    return {
      inputModel: '',
    }
  },
})
</script>

<template>
  <div class="my-input">
    <input type="text" :value="inputModel" @onChange="updateInputValue" />
    <label for="`${inputName}`">{{ inputLabel }}</label>
  </div>
</template>

<style scoped></style>
