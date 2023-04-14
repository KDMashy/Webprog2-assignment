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
      return "sm:grid-cols-1";
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

export function formatDate(unixTimeStamp) {
  const parsedDate = new Date(unixTimeStamp);

  const formatedDate =
    parsedDate.getFullYear() +
    "." +
    String(parsedDate.getMonth() + 1).padStart(2, "0") +
    "." +
    String(parsedDate.getDate()).padStart(2, "0") +
    " " +
    String(parsedDate.getHours()).padStart(2, "0") +
    ":" +
    String(parsedDate.getMinutes()).padStart(2, "0");

  return formatedDate;
}
