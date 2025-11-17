package taskworker

import (
	"fmt"
	"time"
)

func RunTask(task string) {
	fmt.Println("Running task:", task)
	time.Sleep(1 * time.Second)
}
