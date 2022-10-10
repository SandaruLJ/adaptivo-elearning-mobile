import RNFetchBlob from "rn-fetch-blob";

export const checkFreeStorage = async () => {
  return await RNFetchBlob.fs.df().then((response) => {
    const totalStorage = response.external_total;
    const freeStorage = response.external_free;
    const freeStoragePercentage = (freeStorage / totalStorage) * 100;

    return {
      freeStorage: freeStorage,
      percentage: freeStoragePercentage,
    };
    // console.log(freeStoragePercentage);
    // console.log("External free space in bytes: " + response.external_free / 1000000);
    // console.log("External total space in bytes: " + response.external_total / 1000000);
    // console.log("Internal free space in bytes: " + response.internal_free / 1000000);
    // console.log("Internal total space in bytes: " + response.internal_total / 1000000);
  });
};

export const setDownloadQuality = async (requiredStorage) => {
  const availableStorage = await checkFreeStorage();

  const freeStorage = availableStorage.freeStorage;
  const freeStoragePercentage = availableStorage.percentage;
  const storagePercentage = (requiredStorage / freeStorage) * 100;
  if (requiredStorage > freeStorage) {
    return;
  }
  if (storagePercentage < 25) {
    return "high";
  } else {
    if (freeStoragePercentage >= 25) {
      return "high";
    } else if (freeStoragePercentage >= 15) {
      return "medium";
    } else if (freeStoragePercentage < 15) {
      return "low";
    } else if (freeStoragePercentage < 5) {
      return "veryLow";
    }
  }

  console.log(storagePercentage);
};
