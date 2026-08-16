from fastapi import FastAPI

app = FastAPI(title="KICET Hackathon Backend")


@app.get("/api/admin/dashboard")
def get_admin_dashboard():
    return {
        "total_students": 1200,
        "total_teachers": 65,
        "total_courses": 48,
        "at_risk_students": 83,
        "average_attendance": 78,
        "average_performance": 71
    }