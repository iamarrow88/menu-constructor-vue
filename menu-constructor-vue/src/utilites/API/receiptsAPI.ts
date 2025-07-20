import {endpoints, headers, methods} from "@/constants/constants.ts";
import type {iReceipt} from "@/types/types.ts";

class ReceiptsAPI {
  getAllReceipts() {

  }
  getReceiptById() {

  }
  async createReceipt(receipt: iReceipt) {
    const addingReceipt = await fetch(endpoints.receipts, {
      method: methods.POST,
      headers: {
        'Content-Type': headers.ContentType,
      },
      body: JSON.stringify(receipt)
    });
    return await addingReceipt.json();
  }
  updateReceipt() {

  }
  deleteReceipt() {

  }
}

export default new ReceiptsAPI();
