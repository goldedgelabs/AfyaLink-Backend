import datetime

class DecisionTwin:
    def __init__(self, user_name="Joseph"):
        self.user_name = user_name

    def make_decision(self, task):
        print(f"[NeuroEdge] {self.user_name}'s AI twin is deciding on: {task}")
        return f"Decision for '{task}' completed at {datetime.datetime.now()}"

if __name__ == "__main__":
    twin = DecisionTwin()
    print(twin.make_decision("Schedule investor meeting"))
