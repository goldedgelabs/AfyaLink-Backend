import time

class DigitalTwin:
    def __init__(self, user_name):
        self.user_name = user_name

    def speak(self, message):
        print(f"[{self.user_name}] says: {message}")

    def perform_task(self, task):
        print(f"Performing task: {task}")

    def auto_meeting(self, meeting):
        print(f"Attending meeting: {meeting}")

# Example usage
if __name__ == "__main__":
    twin = DigitalTwin("Joseph Were")
    twin.speak("Hello, founder!")
    twin.perform_task("Send report to board")
