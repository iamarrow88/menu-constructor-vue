import type {iReceipt} from "@/data/types/types.ts";
import ReceiptsAPI from "@/utilites/API/receiptsAPI.ts";
import ReceiptServices from "@/utilites/services/receiptServices.ts";

class ReceiptsStorage {
  public receipts: iReceipt[];
  public tags: string[];
  constructor() {
    this.receipts = [];
    this.tags = [];
  }
  async refreshAllReceipts() {
    ReceiptServices.getAllReceipts().then((receipts) => {
      if (receipts) {
        this.receipts = receipts;
      }
    })
    /*ReceiptsAPI.fetchAllReceipts().then((receipts) => {
      this.receipts = receipts.json();
    })*/
  }
  addReceipt(newReceipt: iReceipt) {
    ReceiptsAPI.createReceipt(newReceipt).then(() => {
      this.refreshAllReceipts();
    })
/*    let isReceiptExist = false;
    const { _id } = newReceipt;

    for (let i = 0; i < this.receipts.length; i++) {
      const receipt = this.receipts[i];
      if (receipt._id === _id) {
        isReceiptExist = true;
        return 'Такой рецепт уже есть в хранилище';
      }
    }
    this.receipts.push(newReceipt);*/
  }
  getTagsList(receipts: iReceipt[]) {
    return Object.keys(receipts.reduce((acc: Record<string, number>, receipt: iReceipt) => {
      const { tags } = receipt;
      tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = 1;
        }
      })
      return acc;
    }, {}))
  }
}

const receiptsStorage = new ReceiptsStorage();
export default receiptsStorage;
