# IOT2026 RESTful API – Assignment 1 (Student CRUD)

REST API สำหรับ CRUD ข้อมูลนักศึกษา สร้างด้วย Hono + PostgreSQL + Drizzle ORM + Zod (อ้างอิงตัวอย่างที่ 2.2)

## ข้อมูลนักศึกษา

| field | type | หมายเหตุ |
|---|---|---|
| id | integer | auto-generated |
| firstName | string | ชื่อ |
| lastName | string | นามสกุล |
| studentCode | string | รหัสประจำตัว (ห้ามซ้ำ) |
| birthDate | string | วันเกิด `YYYY-MM-DD` |
| gender | `male` \| `female` \| `other` | เพศ |

## Endpoints (`/api/v1/students`)

| Method | Path | ทำอะไร | Status |
|---|---|---|---|
| GET | `/api/v1/students` | ดึงทั้งหมด | 200 |
| GET | `/api/v1/students/:id` | ดึงรายคน | 200 / 404 |
| POST | `/api/v1/students` | สร้างใหม่ | 201 / 400 / 409 |
| PATCH | `/api/v1/students/:id` | แก้ไข (ส่งบาง field ได้) | 200 / 404 / 409 |
| DELETE | `/api/v1/students/:id` | ลบ | 204 / 404 |

ตัวอย่าง:

```sh
curl -X POST http://localhost:3000/api/v1/students \
  -H "Content-Type: application/json" \
  -d '{"firstName":"นันทวัฒน์","lastName":"โรจนพันธุ์","studentCode":"67070088","birthDate":"2005-01-31","gender":"male"}'
```

## Setup

```sh
docker run --name iot-lab-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=iot_lab -p 5432:5432 -d postgres:17-alpine
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run db:migrate
npm run dev               # http://localhost:3000
```

Deploy ได้บน Vercel (`api/index.ts` + `vercel.json`) โดยตั้ง `DATABASE_URL` เป็น environment variable
