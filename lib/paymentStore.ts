let lastReference: string | null = null;

export async function savePaymentReference(id: string): Promise<void> {
  lastReference = id;
}

export async function getReferenceFromDB(): Promise<string | null> {
  return lastReference;
}

