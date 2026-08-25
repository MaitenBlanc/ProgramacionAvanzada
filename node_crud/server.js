/**
 * 01 - TODO API
 * Nivel: Basico
 *
 * Objetivo:
 * - Entender los 5 metodos HTTP basicos (GET, POST, PUT, PATCH, DELETE)
 * - Entender el mapeo entre metodo HTTP + ruta -> operacion CRUD
 * - Codigos de estado HTTP correctos (200, 201, 204, 404, 400, 500)
 * - Filtrado simple por query params
 *
 * No usa base de datos: los datos viven en un array en memoria.
 * Esto significa que si reiniciamos el servidor, se pierden los datos.
 * (Es intencional para que el ejemplo sea facil de correr sin instalar nada mas)
 */

import express from 'express'

const app = express()
const PORT = 3001

// Middleware para parsear el body de las peticiones
app.use(express.json())

// Base de datos en momoria
let task = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        stauts: 'completed',
        duaDate: '2026-08-15',
        createdAt: '2026-08-14',
        updatedAt: '2026-08-14',
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        stauts: 'pending',
        duaDate: '2026-08-16',
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        stauts: 'pending',
        duaDate: '2026-08-17',
    },
    {
        id: 4,
        title: 'Task 4',
        description: 'Description 4',
        stauts: 'pending',
        duaDate: '2026-08-18',
    },
    {
        id: 23,
        title: 'Task 23',
        description: 'Description 5',
        stauts: 'pending',
        duaDate: '2026-08-14',
    },
]

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(task)
})

// POST /task
app.post('/task', (req, res) => {
    try {
        const { title, description, stauts, duaDate } = req.body

        const newTask = {
            id: task.length + 1,
            title,
            description,
            stauts,
            duaDate,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        task.push(newTask)
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

// TODO tarea hacer un get por id
// TODO tarea hacer un actualizar (put)
// TODO tarea hacer un delete por id

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📝 API endpoints available at /tasks`)
})