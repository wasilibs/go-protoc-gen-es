package main

import (
	"os"

	"github.com/wasilibs/go-protoc-gen-es/v2/internal/runner"
	"github.com/wasilibs/go-protoc-gen-es/v2/internal/wasm"
)

func main() {
	os.Exit(runner.Run("protoc-gen-es", os.Args[1:], wasm.ProtocGenES, os.Stdin, os.Stdout, os.Stderr, "."))
}
