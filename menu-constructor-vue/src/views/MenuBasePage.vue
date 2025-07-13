<template>
  <div class="menu-base-page">
    <button class="menu-base-page__description-management"
            @click="toggleDescriptionVisibility">
      {{ this.isDescriptionVisible ? 'Скрыть описание' : 'Показать описание' }}
    </button>
    <div v-if="isDescriptionVisible" class="menu-base-page__description description description__visible">
      <h1>Добавление и управление рецептами</h1>
      <p>Добро пожаловать на страницу добавления рецептов!</p>
      <p>Здесь вы можете легко сохранять и управлять своими кулинарными шедеврами.</p>
      <p>Основные функции:</p>
      <ul>
        <li><span>Добавление нового рецепта:</span>
          Простая форма для ввода всех необходимых данных о вашем блюде,
          включая название, ингредиенты, пошаговые инструкции и фото.</li>
        <li><span>Управление рецептами:</span>
          Просматривайте все ранее добавленные рецепты в одном месте.
          Удобный интерфейс позволяет редактировать или
          удалять существующие рецепты по мере необходимости.</li>
        <li><span>Поиск по названию или ингредиенту:</span>
          Найдите нужный рецепт за считанные секунды,
          используя функцию поиска. Просто введите название рецепта или ингредиент,
          и мы покажем вам соответствующие результаты.
        </li>
        <li><span>Фильтрация по приему пищи и тегам:</span>
          Удобные теги помогут вам быстро сортировать рецепты по типу приема пищи
          (завтрак, обед, ужин) или по вашим собственным тегам,
          что делает поиск еще более эффективным.
        </li>
      </ul>
      <p>Создайте свою кулинарную библиотеку и наслаждайтесь процессом приготовления!
      </p>
    </div>
    <div class="menu-base-page__content content">
      <button>Добавить рецепт</button>

      <fieldset class="menu-base-page__options options">
        <legend class="options__title">Показать рецепты для:</legend>
        <input type="checkbox" name="breakfast" id="breakfast"><label for="breakfast">Завтрак</label>
        <input type="checkbox" name="snack" id="snack"><label for="snack">Перекус</label>
        <input type="checkbox" name="lunch" id="lunch"><label for="lunch">Обед</label>
        <input type="checkbox" name="dinner" id="dinner"><label for="dinner">Ужин</label>
      </fieldset>

      <fieldset v-if="tags?.length !== 0" class="menu-base-page__tags tags">
        <legend class="tags__title">Показать рецепты с тегами:</legend>

        <input v-for="tag in tags" type="checkbox" name={{tag}} id={{tag}}><label for={{tag}}>{{ tag }}</label>
      </fieldset>

      <div v-if="receipts.length >= 1" class="menu-base-page__receipt-list receipt-list">
        <div v-for="receipt in receipts" class="receipt-card">
          <picture class="receipt-card__picture">
            <source srcset="../assets/images/photo_2025-05-28_09-34-59.jpg"/>
            <img src="../assets/images/picture_example.jpg" alt="receipt photo" />
          </picture>

          <p>{{ receipt.name }}</p>
          <p>{{ translateMealType(receipt.mealType) }}</p>
          <p>Ингредиенты: {{ extractObjectKeysNames(receipt.ingredients) }}</p>
<!--          <p>Ингредиенты:</p>
          <ul>
            <li v-for="ingredient in receipt.ingredients">{{ ingredient.name }}: {{ ingredient.value }}</li>
          </ul>
          <p>Способ приготовления: {{ receipt.howToCook }}</p>-->
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type {iReceipt} from "@/types/types.ts";
import type {PropType} from "vue";
import {translateMealType} from "../utilites/translateMealType.ts";

interface iMenuBasePageData {
  isDescriptionVisible: boolean;
  receipts: iReceipt[];
}

type ITagsArray = string[];

export default {
  data() {
    return {
      isDescriptionVisible: true, //!TODO пусть выбор сохраняется при перезагрузке страницы
      receipts: [
/*        {
          "name": "Омлет1",
          "mealType": "breakfast",
          "id": 0,
          "ingredients": [
            {
              name: "яйцо",
              value: "2 шт"
            },
            {
              name: "молоко",
              value: "200 мл"
            },
            {
              name: "соль",
              value: "щепотка"
            },
            {
              name: "разрыхлитель",
              value: "0,5 ч.л."
            },
          ],
          "howToCook": "по схеме"
        }*/
      ],
    }
  },
  props: {
    tags: {
      type: Array as PropType<string[]>,
    },
  },
  methods: {
    translateMealType,
    findMealType: translateMealType,
    toggleDescriptionVisibility() {
      this.isDescriptionVisible = !this.isDescriptionVisible;
    },
    extractObjectKeysNames(array: {name: string, value: string}[]) {
      const names = array.map(item => item.name);
      return names.join(', ');
    }
  },
}
</script>

<style>
.menu-base-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 1rem;
}

.receipt-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 0 auto;
  max-width: 1310px;
}

.receipt-card {
  padding: 24px 24px 16px 24px;
  width: 100%;
  height: 350px;
  border: 1px solid rgba(38, 37, 34, 0.16);
  border-radius: 24px;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  background-color: rgb(246, 235, 213);
}

.receipt-card:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.receipt-card__picture {
  display: block;
  margin: 0 auto;
  width: 80%;
  height: 70%;
  overflow: hidden;
}

.receipt-card__picture > source, .receipt-card__picture > img  {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center center;
  margin: 0 auto;
}
</style>
