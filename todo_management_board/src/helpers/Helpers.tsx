export const checkDate = (dueDate) => {
  if (!dueDate) return false;
  if (typeof dueDate === "string") dueDate = parseInt(dueDate);
  let now = Date.now();
  if (dueDate >= now) return false;
  return true;
};

export const getColCount = (cols) => {
  if (!cols) return 0;
  let colCount = 0;
  Object.keys(cols).map((col) => {
    if (cols[col]) colCount++;
  });
  switch (colCount) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "md:grid-cols-2";
    case 3:
      return "md:grid-cols-3";
    case 4:
      return "lg:grid-cols-4";
    default:
      return "";
  }
};
