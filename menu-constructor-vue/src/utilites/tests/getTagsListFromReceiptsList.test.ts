import { expect, test } from 'vitest'
import {getTagsListFromReceiptsList} from "@/utilites/getTagsListFromReceiptsList.ts";
import {receiptsList, tags} from "@/utilites/tests/testConstants.ts";


test('adds 1 + 2 to equal 3', () => {
  expect(getTagsListFromReceiptsList(receiptsList)).toEqual(tags)
})
