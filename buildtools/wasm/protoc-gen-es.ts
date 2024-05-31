import "./textcoding.js";

import { protocGenEs } from "@bufbuild/protoc-gen-es/dist/cjs/src/protoc-gen-es-plugin.js";

import { runQuickJs  } from "./run-quickjs.js";

runQuickJs(protocGenEs);
