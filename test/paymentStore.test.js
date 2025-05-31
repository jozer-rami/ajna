import assert from 'node:assert/strict';
import { test } from 'node:test';
import { savePaymentReference, getReferenceFromDB } from '../dist/paymentStore.js';

test('saves and retrieves payment reference', async () => {
  await savePaymentReference('123');
  const ref = await getReferenceFromDB();
  assert.equal(ref, '123');
});
