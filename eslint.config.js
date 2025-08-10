import next from "eslint-config-next";

export default [
  ...next,
  {
    ignores: [".next", "dist", "build"],
  },
];
