<template>
  <div class="menu-base-page">
    <button class="menu-base-page__description-management btn" @click="toggleDescriptionVisibility">
      {{ isDescriptionVisible ? 'Скрыть описание' : 'Показать описание' }}
    </button>
    <div
      v-if="isDescriptionVisible"
      class="menu-base-page__description description description__visible"
    >
      <h1>Добавление и управление рецептами</h1>
      <p>Добро пожаловать на страницу добавления рецептов!</p>
      <p>Здесь вы можете легко сохранять и управлять своими кулинарными шедеврами.</p>
      <p>Основные функции:</p>
      <ul>
        <li>
          <span>Добавление нового рецепта:</span> Простая форма для ввода всех необходимых данных о
          вашем блюде, включая название, ингредиенты, пошаговые инструкции и фото.
        </li>
        <li>
          <span>Управление рецептами:</span> Просматривайте все ранее добавленные рецепты в одном
          месте. Удобный интерфейс позволяет редактировать или удалять существующие рецепты по мере
          необходимости.
        </li>
        <li>
          <span>Поиск по названию или ингредиенту:</span>
          Найдите нужный рецепт за считанные секунды, используя функцию поиска. Просто введите
          название рецепта или ингредиент, и мы покажем вам соответствующие результаты.
        </li>
        <li>
          <span>Фильтрация по приему пищи и тегам:</span>
          Удобные теги помогут вам быстро сортировать рецепты по типу приема пищи (завтрак, обед,
          ужин) или по вашим собственным тегам, что делает поиск еще более эффективным.
        </li>
      </ul>
      <p>Создайте свою кулинарную библиотеку и наслаждайтесь процессом приготовления!</p>
    </div>
    <div class="menu-base-page__content content">
      <RouterLink class="content__btn btn" to="/add-receipt">Добавить рецепт</RouterLink>

      <fieldset class="menu-base-page__options options">
        <!-- !TODO список приемов пищи из списка рецептов -->
        <legend class="options__title">Показать рецепты для:</legend>
        <div v-for="(mealType, index) in mealTypes" class="tags__input-group" :key="index">
          <div class="options__input-group">
            <input type="checkbox"
                   @change="updateReceiptsList"
                   :name="`${mealType.name}`"
                   :id="`${mealType.name}`"
                   :value="`${mealType.name}`"
                   class="options__input"
                   v-model="selectedMeals" />
            <label :for="`${mealType.name}`" class="options__label">{{ mealType.translate }}</label>
          </div>
        </div>
      </fieldset>

      <fieldset v-if="tags?.length !== 0" class="menu-base-page__tags tags">
        <legend class="tags__title">Показать рецепты с тегами:</legend>
        <div v-for="(tagName, index) in tags" class="tags__input-group" :key="index">
          <input type="checkbox"
                 @change="updateReceiptsList"
                 :name="`${tagName}`"
                 :id="`${tagName}`"
                 :value="`${tagName}`"
                 class="tags__input"
                 v-model="selectedTags" />
          <label for="`${tagName}`" class="tags__label">{{ tagName }}</label>
        </div>
      </fieldset>

      <div v-if="receiptsList.length >= 1"
           class="menu-base-page__receipt-list receipt-list">
        <RouterLink
          v-for="receipt in receiptsList"
          class="receipt-card"
          :to="`/show-receipt/${receipt._id}`"
          :key="receipt._id"
          :receiptId="receipt._id"
        >
          <picture class="receipt-card__picture">
            <source srcset="../assets/images/photo_2025-05-28_09-34-59.jpg" />
            <img src="../assets/images/picture_example.jpg" alt="receipt photo" />
          </picture>

          <p>{{ receipt.name }}</p>
          <p>{{ translateMealType(receipt.mealType) }}</p>
          <p>Ингредиенты: {{ extractObjectKeysNames(receipt.ingredients) }}</p>
          <p>Теги: {{ receipt.tags.length !== 0 ? receipt.tags.join(', ') : 'Отсутствуют' }}</p>
          <button class="btn">Добавить в меню</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type {iCustomError, iMealType, iReceipt} from '@/types/types.ts'
import { translateMealType } from '../utilites/translateMealType.ts'
import { RouterLink } from 'vue-router'
import ReceiptsAPI from '@/utilites/API/receiptsAPI.ts'
import receiptsStorage from "@/stores/receiptsStorage.ts";

interface mealType {
  name: string,
  translate: string,
}
interface IMenuBasePageData {
  isDescriptionVisible: boolean
  receipts: iReceipt[],
  mealTypes: mealType[],
  selectedMeals: string[],
  tags: string[],
  selectedTags: string[],
}

export default {
  components: { RouterLink },
  data(): IMenuBasePageData {
    return {
      isDescriptionVisible: true, //!TODO пусть выбор сохраняется при перезагрузке страницы
      receipts: [],
      tags: receiptsStorage.tags,
      selectedTags: [],
      selectedMeals: [],
      mealTypes: [
        {
          name: 'breakfast',
          translate: 'Завтрак'
        },
        {
          name: 'lunch',
          translate: 'Обед'
        },
        {
          name: 'dinner',
          translate: 'Ужин'},
        {
          name: 'snack',
          translate: 'Перекус'
        }
      ],
    }
  },
  computed: {
    receiptsList(): iReceipt[] { /* !TODO filter doesn't work correctly */
      return this.filterAllReceiptsByMealType(this.filterAllReceiptsByTags(this.receipts, this.selectedTags), this.selectedMeals);
    }
  },
  methods: {
    translateMealType,
    findMealType: translateMealType,
    toggleDescriptionVisibility() {
      this.isDescriptionVisible = !this.isDescriptionVisible
    },
    extractObjectKeysNames(array: { name: string; value: string }[]) {
      try {
        const names = array.map((item) => item.name)
        return names.join(', ')
      } catch (e) {
        console.error(e)
      }
    },
    getFirstSelectedMealTypes() {
      return this.mealTypes.map((mealType) => mealType.name);
    },
    async updateReceiptsList() {
      console.log('updateReceiptsList');
      this.receipts = await ReceiptsAPI.getAllReceipts();
    },
    filterAllReceiptsByTags(receipts: iReceipt[], tags: string[]): iReceipt[] {
      return receipts.reduce((filteredReceipts, receipt) => {
        if (receipt.tags.length === 0) {
          filteredReceipts.push(receipt);
        } else {
          for (let j = 0; j < tags.length; j++) {
            if (receipt.tags.includes(tags[j]) && !filteredReceipts.includes(receipt)) {
              filteredReceipts.push(receipt);
            }
          }
        }
        return filteredReceipts;
      }, [] as iReceipt[]);
    },
    filterAllReceiptsByMealType(receipts: iReceipt[], mealTypes: string[]) {
      return receipts.reduce((filteredReceipts, receipt) => {
        for (let i = 0; i < mealTypes.length; i++) {
          if (receipt.mealType[mealTypes[i] as keyof iMealType] && !filteredReceipts.includes(receipt)) {
            filteredReceipts.push(receipt);
            break;
          }
        }
        return filteredReceipts;
      }, [] as iReceipt[])
    },
  },
  async mounted() {
    try {
      this.receipts = await ReceiptsAPI.getAllReceipts();
      this.tags = receiptsStorage.getTagsList(this.receipts);
      this.selectedTags = [...this.tags];
      this.selectedMeals = this.getFirstSelectedMealTypes();
    } catch (e: unknown | iCustomError) {
      console.log('ошибка 1')
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

/*.menu-base-page__description-management,
.content__btn {
  border: 1px solid var(--dark);
  border-radius: 24px;
  padding: 12px 24px;
  !*width: 166px;*!
  height: 38px;
  background-color: var(--primary-color-2);
  font-family: var(--font-family), sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  text-transform: uppercase;
  color: var(--dark);
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}*/

.tags,
.options {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.tags__input-group,
.options__input-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
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

.receipt-card__picture > source,
.receipt-card__picture > img {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center center;
  margin: 0 auto;
}
</style>
