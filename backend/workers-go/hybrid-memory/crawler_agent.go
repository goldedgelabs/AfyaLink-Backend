package main

import (
	"fmt"
	"time"
)

// Crawling Agent to scan websites and update AI memory
func CrawlWebsites() {
	fmt.Println("[NeuroEdge] Crawling agent started...")
	websites := []string{
		"https://news.example.com",
		"https://tech.example.com",
	}

	for {
		for _, site := range websites {
			fmt.Printf("[NeuroEdge] Crawling %s and updating AI memory...\n", site)
			// Simulate memory update (in production, save to MongoDB/SQLite)
		}
		time.Sleep(20 * time.Second)
	}
}

func main() {
	CrawlWebsites()
}
