export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {
  const totalPagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray[i] = i;
  }
  return totalPagesArray;
};