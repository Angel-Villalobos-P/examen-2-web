import React from 'react'
import './InventarioDashboard.scss'

const InventarioDashboard = () => {
  const INVETARIO_LABELS = ["Identificador", "Producto"]
  return (
    <div className='inventory-container'>
      <div className='card'>
        <div className='card-header'>
          <div className='d-flex'>
            <h2 className='m-0'>Inventario</h2>
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
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Cantidad Maxima</th>
                <th scope="col">Cantidad Minima</th>
                <th scope="col">Gravado o Excepto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>123456</td>
                <td>test</td>
                <td>13</td>
                <td>25</td>
                <td>2</td>
                <td>test</td>
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

export default InventarioDashboard