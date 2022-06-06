import React, {useState} from 'react'
import './ClientesDashboard.scss'
import ModalCliente from './ModalCliente';


const ClientesDashboard = () => {
  
  const [isModal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  return (
    <React.Fragment>
      <div className='client-container'>
        <div className='card'>
          <div className='card-header'>
            <div className='d-flex'>
              <h2 className='m-0'>Clientes</h2>
              <span className='span-card'></span>
              <button type="button" className="btn btn-secondary" onClick={handleShow}>Agregar</button>
              <ModalCliente isshow={isModal} handleClose={handleClose}/>
            </div>
          </div>
          <div className='card-body'>
            <div className='mt-3 px-3'>
              <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Cedula</th>
                  <th scope="col">Nombre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>123456</td>
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
     
    </React.Fragment>
  )
}

export default ClientesDashboard