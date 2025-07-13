import type {iReceipt} from "@/types/types.ts";

export function getTagsListFromReceiptsList(receiptsList: Array<iReceipt>) {
  const tags = [];
  receiptsList.forEach((receipt) =>  {
    receipt.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags.sort();
}
