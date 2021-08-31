export const capitalizeFirstLetter = str => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

export const sortByDate = (a, b) =>
  new Date(a.movieDate).getTime() - new Date(b.movieDate).getTime();
