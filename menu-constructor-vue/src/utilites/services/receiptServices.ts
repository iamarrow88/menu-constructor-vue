import ReceiptsAPI from "@/utilites/API/receiptsAPI.ts";
import type {iReceipt} from "@/data/types/types.ts";

class ReceiptServices {
  async checkResponse(response: Response): Promise<Response | Error> {
    try {
      return await response.json();
    } catch (e) {
      return e as Error;
    }
  }
  getAllReceipts(): Promise<Response | undefined> {
    return ReceiptsAPI.fetchAllReceipts().then((response) => {
      return this.checkResponse(response).then(checkedResponse => {
        if (checkedResponse instanceof Error) {
          console.log('checkedResponse.message: ' + checkedResponse.message);
          return undefined;
        } else {
          return checkedResponse;
        }
      })
    })
  }
}

export default new ReceiptServices();
