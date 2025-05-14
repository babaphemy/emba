const basePath = process.env.NEXT_PUBLIC_BASEPATH;

const authKey = process.env.NEXT_PUBLIC_APIKEY;
export const auth = {
  headers: { Authorization: `Basic ${authKey}` },
};
export const PostSettings = <T>(obj: T) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authKey}`,
    },
    body: JSON.stringify(obj),
  };
};
export const DeleteSettings = <T>(obj: T) => {
  return {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authKey}`,
    },
    body: JSON.stringify(obj),
  };
};
export const PutSettings = <T>(obj: T) => {
  return {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authKey}`,
    },
    body: JSON.stringify(obj),
  };
};

export { basePath };
