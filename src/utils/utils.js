export const removeLastVirama = (keyword) => keyword.replace(/्$/, "");

export const svarasRegex = "[॒॑]";

export const removeSvaras = (dhatu) =>
  dhatu.replace(new RegExp(svarasRegex, "g"), "");

export const createURL = (endpoint, path) => (path ? `${endpoint}${path}` : "");
