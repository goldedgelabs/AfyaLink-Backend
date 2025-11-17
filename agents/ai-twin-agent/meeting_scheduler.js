// Schedules meetings for the AI twin
class MeetingScheduler {
    constructor(userName) {
        this.userName = userName;
    }

    scheduleMeeting(topic, time) {
        console.log(`[NeuroEdge] ${this.userName}'s AI twin scheduled a meeting on '${topic}' at ${time}`);
    }
}

const scheduler = new MeetingScheduler("Joseph");
scheduler.scheduleMeeting("Investor Call", "2025-11-20 10:00");
