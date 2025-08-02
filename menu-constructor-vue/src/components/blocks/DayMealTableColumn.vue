<template>
  <tr>
    <th>{{ mealName }}</th>
    <td v-if="Boolean(mealForADay[0])">{{mealForADay[0]}}</td><td v-else><button class="btn">Добавить блюдо</button></td>
    <td v-if="mealForADay[1]">{{mealForADay[1]}}</td><td v-else><button class="btn">Добавить блюдо</button></td>
    <td v-if="mealForADay[2]">{{mealForADay[2]}}</td><td v-else><button class="btn">Добавить блюдо</button></td>
  </tr>

</template>

<script lang="ts">

export default {
  name: "DayMealTableColumn",
  props: {
    mealName: {
      type: String,
      required: true,
    },
    mealForADay: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
 tr {
   display: grid;
   grid-template-rows: 1fr 2fr 2fr 2fr;
 }

 td {
   padding: 0 1rem;
   border-left: 1px solid var(--dark);
 }

 tr:first-child > td {
   border-left: none;
 }

</style>
