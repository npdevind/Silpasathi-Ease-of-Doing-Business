import fs from "fs-extra";
import { swaggerSpec } from "./swaggerConfig";

fs.writeFileSync("./swagger.json", JSON.stringify(swaggerSpec, null, 2));
// Or, if you prefer YAML
// const yaml = require('js-yaml');
// fs.writeFileSync('./swagger.yaml', yaml.safeDump(swaggerSpec));
