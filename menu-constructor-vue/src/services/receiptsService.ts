import type { iReceipt } from '@/types/types.ts'
import ReceiptsAPI from '@/utilites/API/receiptsAPI.ts'

class ReceiptsService {
  async getReceipt(id: string): Promise<iReceipt | string> {
    const response = await ReceiptsAPI.getReceiptById(id)
    if (response._id) {
      return response
    } else {
      return 'Ошибка. Рецепт не найден'
    }
  }
}

export default new ReceiptsService()
