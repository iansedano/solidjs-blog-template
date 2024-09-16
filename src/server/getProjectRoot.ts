import path from "path";
import fs from "fs";

const getProjectRoot = () => {
  let dir = "./";
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    dir = path.dirname(dir);
  }
  return dir;
};

export default getProjectRoot;
