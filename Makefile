.PHONY: all clean serve

all: main.wasm serve

%.wasm: %.go
	GOOS=js GOARCH=wasm go build -o "$@" "$<"

serve:
	serve || (go get -v github.com/mattn/serve && serve)

clean:
	rm -f *.wasm
