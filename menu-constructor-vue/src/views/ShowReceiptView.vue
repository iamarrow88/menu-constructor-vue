<template>
  <div v-if="isReceiptLoaded" class="show-receipt-page">
    <h1>{{ receipt.name }}</h1>
    <div v-for="ingredient in ingredientsPrettier(receipt.ingredients)">
      <p :key="Date.now()">{{ ingredient }}</p>
    </div>
    <p>{{ translateMealType(receipt.mealType) }}</p>
    <p>{{ receipt.howToCook }}</p>
    <div v-if="receipt.tags.length < 1">
      <div v-for="tag in receipt.tags">
        <p :key="Date.now()">{{ tag }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { iReceipt } from '@/types/types.ts'
import ReceiptsService from '@/services/receiptsService.ts'
import { translateMealType } from '@/utilites/translateMealType.ts'
import { ingredientsPrettier } from '@/utilites/ingredientsPrittier.ts'

interface iShowReceiptViewData {
  receipt: iReceipt
  isReceiptLoaded: boolean
}

export default {
  name: 'ShowReceiptView',
  data(): iShowReceiptViewData {
    return {
      receipt: {
        _id: '',
        name: '',
        mealType: {
          breakfast: false,
          lunch: false,
          snack: false,
          dinner: false,
        },
        ingredients: [],
        howToCook: '',
        tags: [],
      },
      isReceiptLoaded: false,
    }
  },
  methods: {
    ingredientsPrettier,
    translateMealType,
  },
  async mounted() {
    const receiptId = this.$route.params.id
    const res = await ReceiptsService.getReceipt(receiptId)

    if (typeof res === 'string') {
      this.$router.push('/not-found')
    } else {
      this.receipt = res
      this.isReceiptLoaded = true
    }
  },
}
</script>
