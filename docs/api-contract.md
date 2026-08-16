# API Contract

This document defines how the frontend, backend, and AI modules communicate.

## 1. Admin Dashboard

### GET /api/admin/dashboard

Returns overall system statistics for the Admin Dashboard.

### Response

```json
{
  "total_students": 1200,
  "total_teachers": 65,
  "total_courses": 48,
  "at_risk_students": 83,
  "average_attendance": 78,
  "average_performance": 71
}