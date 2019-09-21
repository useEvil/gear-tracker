export const updateOrReset = (id, field, value, originalItem, pendingItem) => {
  if (originalItem && pendingItem) {
    pendingItem[field] = value;
    if (JSON.stringify(originalItem) === JSON.stringify(pendingItem)) {
      return { isValidUpdate: false };
    }
  } else if (originalItem) {
    pendingItem = {...originalItem};
  }
  pendingItem[field] = value;
  return { isValidUpdate: true,  updatedItem: pendingItem };
};
