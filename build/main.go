package main

import (
	"github.com/goyek/x/boot"
	"github.com/wasilibs/tools/tasks"
)

func main() {
	tasks.Define(tasks.Params{
		LibraryName: "protoc-gen-es",
		LibraryRepo: "bufbuild/protobuf-es",
		GoReleaser:  true,
	})
	boot.Main()
}
