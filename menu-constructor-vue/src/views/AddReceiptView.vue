<template>
  <div class="add-receipt-page">
    <form action="">
      <fieldset>Здесь Вы можете добавить новый рецепт</fieldset>
      <div class="my-input">
        <label for="receiptName">Название рецепта</label>
        <input type="text" id="receiptName" v-model="receipt.name">
      </div>
      <div class="my-select">
        <label for="mealType">Вид приема пищи</label>
        <div class="my-input">
          <label for="breakfast">Завтрак</label>
          <input type="checkbox" name="breakfast" id="breakfast" v-model="receipt.mealType.breakfast">
        </div>
        <div class="my-input">
          <label for="lunch">Обед</label>
          <input type="checkbox" name="lunch" id="lunch" v-model="receipt.mealType.lunch">
        </div>
        <div class="my-input">
          <label for="snack">Перекус</label>
          <input type="checkbox" name="snack" id="snack" v-model="receipt.mealType.snack">
        </div>
        <div class="my-input">
          <label for="dinner">Ужин</label>
          <input type="checkbox" name="dinner" id="dinner" v-model="receipt.mealType.dinner">
        </div>
      </div>
      <div class="my-textarea">
        <label for="ingredients-area">Список ингридиентов в формате "Ингридиент" <select v-model="separator">
          <option>-</option>
          <option>:</option>
          <option>^</option>
        </select> "количество". Будьте внимательны: После второго тире в строке все теряется.</label>
        <textarea name="ingredients-area"
                  id="ingredients-area"
                  cols="30"
                  rows="5"
        v-model="rawIngredients"></textarea>
      </div>
      <div class="my-textarea">
        <label for="how-to-cook-area">Способ приготовления</label>
        <textarea name="how-to-cook-area"
                  id="how-to-cook-area"
                  cols="30"
                  rows="10"
                  v-model="receipt.howToCook"></textarea>
      </div>
      <div class="my-tags">
        <input type="text" name="tags" id="new-tag" placeholder="Введите тег" v-model="newTag">
        <button type="submit" @click.prevent="saveTag">Добавить тег</button>
        <div class="my-tags__result">{{ receipt.tags.join(', ') }}</div>
      </div>
      <button type="reset" @click.prevent="saveReceipt">Очистить форму</button>
      <button type="submit" @click.prevent="saveReceipt">Сохранить</button>
    </form>
  </div>
</template>

<script>
import {formatIngredients} from "@/utilites/formatIngredients.js";
import {stringIsNotEmpty} from "@/utilites/validation/string-is-not-empty.js";
import {arrayIsNotEmpty} from "@/utilites/validation/array-is-not-empty.js";

export default {
  name: 'AddReceiptView',
  data() {
    return {
      receipt: {
        name: '',
        mealType: {
          "breakfast": false,
          "lunch": false,
          "snack": false,
          "dinner": false,
        },
        ingredients: [],
        howToCook: '',
        tags: [],
      },
      rawIngredients: '',
      newTag: '',
      separator: '-'
    }
  },
  methods: {
    async saveReceipt() {
      this.receipt.ingredients = formatIngredients(this.rawIngredients, this.separator);
      if (stringIsNotEmpty(this.receipt.name)
        && stringIsNotEmpty(this.receipt.howToCook)
        && arrayIsNotEmpty(this.receipt.ingredients)) {
        console.log(this.receipt);
        const addingReceipt = await fetch('http://127.0.0.1:3000/receipts', {
          method: 'POST',
          headers: {},
          body: JSON.stringify(this.receipt)
        });
        const response = await addingReceipt.json();

        console.log(response);

        if (response.id) {
          this.$router.push('/base');
        } else {
          console.log('Рецепт не добавлен, ошибка');
        }
      } else {
        console.log('Заполнены не все поля');
      }
    },
    saveTag() {
      this.receipt.tags.push(this.newTag);
      this.newTag = '';
    }
  }
}
</script>

