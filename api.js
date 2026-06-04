const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json()) 

app.use(cors())
app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log("----")
    next()
})

let notes = [
  {
    "id": 1,
    "content": "Me tengo que suscribir a @midudev en YouTube",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 2,
    "content": "Tengo que estudiar las clases del FullStack Bootcamp",
    "date": "2019-05-30T18:39:34.091Z",
    "important": false
  },
  {
    "id": 3,
    "content": "Repasar los retos de JS de midudev",
    "date": "2019-05-30T19:20:14.298Z",
    "important": true
  }
]


app.get("/", (req, res) => {
    res.send('<h1>Hello world</h1>')

})


app.get("/api/notes", (req, res) => {
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(p => p.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).json({message: "Elemento no encontrado"})
    }
})

app.post("/api/notes/", (req, res) => {
    const data = req.body

    if(!data || !data.content ) {
        return res.status(400).json({message: "Contenido requerido"})
    }

    const ids = notes.map(p => p.id)
    const max_id = Math.max(...ids)
    const new_data = {
        id: max_id + 1,
        content: data.content,
        important: data.important,
        date: new Date().toISOString()
    }
    notes = [...notes, new_data]
    res.status(201).json(new_data)
})

app.put("/api/notes/:id", (req, res) => {
    const data = req.body
    const id = Number(req.params.id)
    const note = notes.find(p => p.id === id)

    if (id > -1) {
        const new_note = {...note, ...data}
        notes[id - 1] = new_note
        res.status(200).json(new_note)
    } else {
        req.status(204).json({message: "No existe el elemento"})
    }
    })


app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(p => p.id === id) 
    if (note) {
        notes = notes.filter(p => p.id != id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.use((req, res) => {
    res.status(404)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




