<template>
  <div class="menu-constructor-page">
    <div class="print-deletion-area">
      <h1>Формирование меню</h1>
      <button class="menu-constructor-page__description-management btn" @click="toggleDescriptionVisibility">
        {{ isDescriptionVisible ? 'Скрыть описание' : 'Показать описание' }}
      </button>
      <div v-if="isDescriptionVisible" class="menu-constructor-page__description description">
        <p>
          Добро пожаловать на страницу формирования меню! Здесь вы можете легко создать сбалансированное
          меню, используя вашу базу рецептов.
        </p>
        <p>Основные функции:</p>
        <ul>
          <li>
            <span>Выбор приемов пищи:</span> Укажите, какие приемы пищи вы хотите включить в меню,
            например, обед и ужин. Это позволяет адаптировать меню под ваши предпочтения и потребности.
          </li>
          <li>
            <span>Количество человек:</span> Укажите, для сколько человек вы планируете составить меню —
            для взрослых или детей. Это поможет вам учесть объемы порций и разнообразие блюд.
          </li>
          <li>
            <span>Выбор периода:</span> Определите период, на который вы хотите составить меню, до 2
            месяцев. Это идеально подходит для долгосрочного планирования питания.
          </li>
          <li>
            <span>Печать меню:</span> Получившееся меню можно легко распечатать, чтобы иметь его под
            рукой во время покупок или приготовления пищи.
          </li>
        </ul>
        <p>Создайте свое идеальное меню и наслаждайтесь разнообразием блюд на каждый день!</p>
      </div>

      <div class="menu-constructor-page__meal-types meal-types">
        <form action="" class="meal-types__form">
          <fieldset class="meal-types__options">
            <legend>Выберите нужные Вам приемы пищи:</legend>

            <div class="meal-types__input-group">
              <input type="checkbox" name="breakfast" id="breakfast" class="meal-types__input" v-model="selectedMeals.breakfast" />
              <label for="breakfast" class="meal-types__label">Завтрак</label>
            </div>
            <div class="meal-types__input-group">
              <input type="checkbox" name="snack1" id="snack1" class="meal-types__input" v-model="selectedMeals.snack1" />
              <label for="snack1" class="meal-types__label">Перекус 1</label>
            </div>
            <div class="meal-types__input-group">
              <input type="checkbox" name="lunch" id="lunch" class="meal-types__input" v-model="selectedMeals.lunch" />
              <label for="lunch" class="meal-types__label">Обед</label>
            </div>
            <div class="meal-types__input-group">
              <input type="checkbox" name="snack2" id="snack2" class="meal-types__input" v-model="selectedMeals.snack2" />
              <label for="snack2" class="meal-types__label">Перекус 2</label>
            </div>
            <div class="meal-types__input-group">
              <input type="checkbox" name="dinner" id="dinner" class="meal-types__input" v-model="selectedMeals.dinner" />
              <label for="dinner" class="meal-types__label">Ужин</label>
            </div>
          </fieldset>
        </form>
      </div>
      <button class="btn" @click="printMenu">Печать меню</button>
    </div>
    <h2 class="print-visible-area">Меню</h2>
    <div class="menu-constructor-page__content content">
      <DayTable day-name="Понедельник" :selected-meals=selectedMeals />
      <DayTable day-name="Вторник" :selected-meals=selectedMeals />
      <DayTable day-name="Среда" :selected-meals=selectedMeals />
      <DayTable day-name="Четверг" :selected-meals=selectedMeals />
      <DayTable day-name="Пятница" :selected-meals=selectedMeals />
      <DayTable day-name="Суббота" :selected-meals=selectedMeals />
      <DayTable day-name="Воскресенье" :selected-meals=selectedMeals />
    </div>
    <div class="print-deletion-area">
      <button class="btn" @click="printMenu">Печать меню</button>
    </div>

  </div>
</template>
<script lang="ts">
import DayMealTable from "@/components/blocks/DayMealTable.vue";
import type { selectedMeals } from "@/types/types.ts";

interface data {
  isDescriptionVisible: Boolean,
  selectedMeals: selectedMeals,
}

export default {
  components: {DayTable: DayMealTable},
  data(): data {
     return {
       isDescriptionVisible: true,
       selectedMeals: {
         breakfast: true,
         snack1: true,
         lunch: true,
         snack2: true,
         dinner: true,
       }
     }
  },
  methods: {
    toggleDescriptionVisibility() {
      this.isDescriptionVisible = !this.isDescriptionVisible
    },
    printMenu() {
      window.print();
    }
  }
}
</script>

<style>
.menu-constructor-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.meal-types {
  width: 100%;
}

.meal-types__form {
  width: 100%;
}

.meal-types__options{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.print-visible-area {
  display: none;
}

@media print {
  .header,
  .print-deletion-area{
    display: none !important;
  }
  .print-visible-area {
    display: block;
  }
}
</style>
