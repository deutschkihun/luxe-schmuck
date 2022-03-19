export const rex = new RegExp(
  "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export const stringRex = /^[A-Za-z]+$/;
export const emailRex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const numberRex = /^\d+$/;

export const jsonConfig = { headers: { "Content-Type": "application/json" } };
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const tokenConfig = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const multipartConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const mixRex = /^[a-zA-Z0-9_.-\s.,']*$/;
export const numRex = /^[0-9]*$/;

export const categories = [
  {
    _id: 1,
    name: "Ring",
  },
  {
    _id: 2,
    name: "Bracelet",
  },
  {
    _id: 3,
    name: "Ear Ring",
  },
  {
    _id: 4,
    name: "Necklace",
  },
  {
    _id: 5,
    name: "Anklet",
  },
  {
    _id: 6,
    name: "Hair band",
  },
];

export const brand = [
  {
    _id: 0,
    name: "All",
  },
  {
    _id: 1,
    name: "Tiffany",
  },
  {
    _id: 2,
    name: "LV",
  },
  {
    _id: 3,
    name: "Cartier",
  },
  {
    _id: 4,
    name: "Others",
  },
];
