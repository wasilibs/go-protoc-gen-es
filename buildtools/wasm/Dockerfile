FROM node:20-bookworm AS buildjs

WORKDIR /app

RUN corepack enable

COPY buildtools/wasm/package.json buildtools/wasm/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY buildtools/wasm/*.ts ./
COPY buildtools/wasm/*.mjs ./
COPY buildtools/wasm/tsconfig.json ./
RUN pnpm run build

FROM ghcr.io/webassembly/wasi-sdk:wasi-sdk-21

RUN apt-get update && apt-get install -y binaryen curl patch xz-utils

WORKDIR /quickjs
RUN curl -L https://github.com/bellard/quickjs/archive/f25e5d4094a11cf098670417e8a16ffb7cbadda0.tar.gz | tar -xz --strip-components=1 -C /quickjs
RUN make
RUN make install
RUN make clean
COPY buildtools/wasm/patch-quickjs.txt ./
RUN patch -p1 < patch-quickjs.txt
ENV CUSTOM_CFLAGS $CFLAGS -DEMSCRIPTEN -D_WASI_EMULATED_SIGNAL
RUN make libquickjs.a
RUN $RANLIB libquickjs.a

WORKDIR /app
COPY --from=buildjs /app/dist/protoc-gen-es.js ./
RUN qjsc -e protoc-gen-es.js -o protoc-gen-es.c
RUN $CC $CFLAGS -O2 -o protoc-gen-es-noopt.wasm protoc-gen-es.c -lquickjs -I/usr/local/include/quickjs -L/quickjs -Wl,--global-base=1024
RUN wasm-opt -o protoc-gen-es.wasm --low-memory-unused --flatten --rereloop --converge -O3 protoc-gen-es-noopt.wasm

CMD [ "cp", "protoc-gen-es.wasm", "/out"]
