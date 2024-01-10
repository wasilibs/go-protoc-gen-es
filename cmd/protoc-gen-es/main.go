package main

import (
	"os"

	"github.com/wasilibs/go-protoc-gen-es/internal/runner"
	"github.com/wasilibs/go-protoc-gen-es/internal/wasm"
)

func main() {
	os.Exit(runner.Run("protoc-gen-es", os.Args[1:], wasm.ProtocGenES, os.Stdin, os.Stdout, os.Stderr, "."))
}
