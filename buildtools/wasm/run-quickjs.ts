// Copyright 2021-2024 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { exit, err as stderr, in as stdin, out as stdout } from "std";

import type { Plugin } from "@bufbuild/protoplugin";
import { fromBinary, toBinary } from "@bufbuild/protobuf";
import { CodeGeneratorRequestSchema, CodeGeneratorResponseSchema } from "@bufbuild/protobuf/wkt";
import { PluginOptionError, reasonToString } from "./error.js";

export function runQuickJs(plugin: Plugin): void {
  const args = scriptArgs.slice(1);
  if ((args.length === 1 && args[0] === "-v") || args[0] === "--version") {
    stdout.puts(`${plugin.name} ${plugin.version}\n`);
    exit(0);
    return;
  }
  if (args.length !== 0) {
    stderr.puts(
      `${plugin.name} accepts a google.protobuf.compiler.CodeGeneratorRequest on stdin and writes a CodeGeneratorResponse to stdout\n`,
    );
    exit(1);
    return;
  }
  try {
    const bytes = [];
    while (true) {
      const byte = stdin.getByte();
      if (byte === -1) {
        break;
      }
      bytes.push(byte);
    }
    const data = new Uint8Array(bytes);
    const req = fromBinary(CodeGeneratorRequestSchema, data);
    const res = plugin.run(req);
    const resBinary = toBinary(CodeGeneratorResponseSchema, res);
    stdout.write(resBinary.buffer, 0, resBinary.length);
    exit(0);
  } catch (reason) {
    const message =
      reason instanceof PluginOptionError
        ? reason.message
        : reasonToString(reason);
    stderr.puts(`${plugin.name}: ${message}\n`);
    exit(1);
    return;
  }
}
