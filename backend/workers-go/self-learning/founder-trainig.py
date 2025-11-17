import time

class FounderTrainer:
    def __init__(self, founder_name="Joseph Were"):
        self.founder_name = founder_name

    def reinforce_ai(self):
        print(f"[NeuroEdge] Founder {self.founder_name} is training the AI...")
        while True:
            print("[NeuroEdge] Updating AI behavior and knowledge base...")
            time.sleep(12)

if __name__ == "__main__":
    trainer = FounderTrainer()
    trainer.reinforce_ai()
