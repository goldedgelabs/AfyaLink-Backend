import time

class HabitLearner:
    def __init__(self, user_name="Joseph"):
        self.user_name = user_name
        self.habits = {}

    def learn_habit(self, habit, frequency):
        self.habits[habit] = frequency
        print(f"[NeuroEdge] Learning new habit for {self.user_name}: {habit} - {frequency}")

    def show_habits(self):
        print(f"[NeuroEdge] {self.user_name}'s habits: {self.habits}")

if __name__ == "__main__":
    learner = HabitLearner()
    learner.learn_habit("Check emails", "Daily")
    learner.show_habits()
