package main

import (
	"os"

	"github.com/wasilibs/go-sql-formatter/internal/runner"
	"github.com/wasilibs/go-sql-formatter/internal/wasm"
)

func main() {
	os.Exit(runner.Run("protoc-gen-es", os.Args[1:], wasm.ProtocGenES, os.Stdin, os.Stdout, os.Stderr, "."))
}
