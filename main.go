package main

import (
	"fmt"
	_ "syscall/js"
)
/*
func test() {
	name := js.Global().Get("document").Call("getElementById", "name").Get("value").String()
	fmt.Println("name : " + name)
}

func registerCallbacks() {
	js.Global().Set("test", js.NewCallback(test))
}
*/
func main() {
	fmt.Println("test woong")
	/*
	c := make(chan struct{}, 0)
	registerCallbacks()
	<-c
	*/

}
