import { endpoints, headers, methods } from '@/constants/constants.ts'
import type { iReceipt } from '@/types/types.ts'

class ReceiptsAPI {
  async getAllReceipts(): Promise<iReceipt[]> {
    try {
      const receipts = await fetch(endpoints.receipts)
      return await receipts.json()
    } catch (e: unknown) {
      throw {
        errNumber: 1,
        message: 'Не удалось получить рецепты, ошибка',
      }
    }
  }
  async getReceiptById(id: string): Promise<iReceipt> {
    const receipt = await fetch(endpoints.receipts + '/' + id)
    return await receipt.json()
  }
  async createReceipt(receipt: iReceipt): Promise<Response> {
    const addingReceipt = await fetch(endpoints.receipts, {
      method: methods.POST,
      headers: {
        'Content-Type': headers.ContentType,
      },
      body: JSON.stringify(receipt),
    })
    return await addingReceipt.json()
  }
  async findReceiptsBYQuery(query: string): Promise<Response> {
    const rewReceipts = await fetch(`${endpoints.receipts}?mealType=${query}`)
    return await rewReceipts.json()
  }
  async updateReceipt() {}
  async deleteReceipt() {}
}

export default new ReceiptsAPI()
