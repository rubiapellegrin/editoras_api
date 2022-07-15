const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getEditoras = (request, response, next) => {
    pool.query('SELECT * FROM editora', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addEditora = (request, response, next) => {
    const { descricao } = request.body

    pool.query(
        'INSERT INTO editora (descricao) VALUES ($1)',
        [descricao],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Editora criada.' })
        },
    )
}

const updateEditora = (request, response, next) => {
    const { codigo, descricao } = request.body
    pool.query('UPDATE editora set descricao=$1 where codigo=$2',
        [descricao, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Editora atualizada.' })
        })
}

const deleteEditora = (request, response, next) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM editora where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Editora apagada.' })
    })
}

const getEditoraPorID = (request, response, next) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM editora where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/editoras')
    // GET endpoint
    .get(getEditoras)
    // POST endpoint
    .post(addEditora)
    // PUT
    .put(updateEditora)  

app.route('/editoras/:id')
    .get(getEditoraPorID) 
    .delete(deleteEditora) 


// Start server
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando nas porta 3003`)
})