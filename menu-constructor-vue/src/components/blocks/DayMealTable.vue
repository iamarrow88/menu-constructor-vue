<template>
  <div class="day-meal-table">
    <p class="day-meal-table__title">{{ dayName }}</p>

    <table :class="`table-${columnsNumber()}columns day-meal-table__table table`">
      <DayMealTableColumn v-if="selectedMeals.breakfast" meal-name="Завтрак" :meal-for-a-day="breakfastForADay" />
      <DayMealTableColumn v-if="selectedMeals.snack1" meal-name="Перекус 1" :meal-for-a-day="snack1ForADay" />
      <DayMealTableColumn v-if="selectedMeals.lunch" meal-name="Обед" :meal-for-a-day="lunchForADay" />
      <DayMealTableColumn v-if="selectedMeals.snack2" meal-name="Перекус 2" :meal-for-a-day="snack2ForADay" />
      <DayMealTableColumn v-if="selectedMeals.dinner" meal-name="Ужин" :meal-for-a-day="dinnerForADay" />
    </table>
  </div>

</template>

<script lang="ts">
import DayMealTableColumn from "@/components/blocks/DayMealTableColumn.vue";
import type {PropType} from "vue";
import type {selectedMeals} from "@/types/types.ts";

export default{
  name: "DayMealTable",
  components: {DayMealTableColumn},
  props: {
    dayName: {
      type: String,
      required: true,
    },
    selectedMeals: {
      type: Object as PropType<selectedMeals>,
      required: true,
    }
  },
  data() {
    return {
      breakfastForADay: ['meal1', 'meal2'],
      snack1ForADay: ['meal3', 'meal4'],
      snack2ForADay: ['meal5', 'meal6'],
      lunchForADay: ['meal7', 'meal6'],
      dinnerForADay: ['meal8', 'meal9'],
    }
  },
  methods: {
    checkMealExist(mealName: keyof selectedMeals): boolean {
      return Boolean(this.selectedMeals[mealName]);
    },
    columnsNumber(): number {
      let columnsNumber = 0;
      for (const mealName in this.selectedMeals) {
        if (this.checkMealExist(mealName as keyof selectedMeals)) {
          columnsNumber++;
        }
      }
      return columnsNumber;
    }
  },
}

</script>

<style scoped lang="scss">
.day-meal-table {
  padding: 5px 1rem 1rem;
  width: 100%;
  height: 250px;
  border: 1px solid;
}

.day-meal-table__title {
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
}

.table-5columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: 1px solid;
  height: 85%;
}

.table-4columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid;
  height: 85%;
}

.table-3columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid;
  height: 85%;
}

.table-2columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid;
  height: 85%;
}

.table-1columns {
  display: grid;
  grid-template-columns: 100%;
  border: 1px solid;
  height: 85%;
}
</style>
