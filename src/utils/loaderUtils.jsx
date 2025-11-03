let loaderCount = 0;

export const showLoader = () => {
  loaderCount++;
  const loader = document.getElementById("global-loader");
  if (loader) loader.style.display = "flex";
};

export const hideLoader = () => {
  loaderCount = Math.max(0, loaderCount - 1);
  if (loaderCount === 0) {
    const loader = document.getElementById("global-loader");
    if (loader) loader.style.display = "none";
  }
};
