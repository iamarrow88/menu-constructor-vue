import { endpoints, headers, methods } from '@/data/constants/constants.ts'
import type { iReceipt } from '@/data/types/types.ts'

class ReceiptsAPI {
  async fetchAllReceipts(): Promise<Response> {
      return await fetch(endpoints.receipts)
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
