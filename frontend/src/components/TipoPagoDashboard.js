import React from 'react'
import './TipoPagoDashboard.scss'
const TipoPagoDashboard = () => {
  return (
    <div className='tipopago-container'>
      <div className='card'>
        <div className='card-header'>
          <div className='d-flex'>
            <h2 className='m-0'>Tipo de Pago</h2>
            <span className='span-card'></span>
            <button type="button" className="btn btn-secondary">Agregar</button>
          </div>
        </div>
        <div className='card-body'>
          <div className='mt-3 px-3'>
            <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Identificador</th>
                <th scope="col">Nombre</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>123456</td>
                <td>test</td>
                <td>15</td>
                <td>
                  <button type="button" className="btn btn-secondary btn-sm mx-2">Edit</button>
                  <button type="button" className="btn btn-secondary btn-sm">Delete</button>
                  
                </td>
              </tr>
            </tbody>

            </table>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default TipoPagoDashboard