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

export const mixRex = /^[\w.-]+$/;
export const numRex = /^[0-9]*$/;
export const urlRex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
