/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import City from '../api/geoblink/geoblink.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

City.find({}).remove()
  .then(() => {
    City.create({ 
    "country": "ES", 
    "city": "Madrid", 
    "businesses": [ { 
        "id": "MAD17298", 
        "name": "Farmacia Licenciado Fernández", 
        "address": "Calle Arturo Soria, 15" 
      },
      { 
        "id": "MAD71639921", 
        "name": "Panadería San Martín", 
        "address": "Calle del Hostal, 5" 
      }, 
      { 
        "id": "MAD714329", 
        "name": "Calzados la suela", 
         "address": "Calle Jardín, 33, 1o A" 
      },
      { 
        "id": "MAD767329", 
        "name": "Panadería Zurro", 
        "address": "Avenida del Pardo, 32" 
      }, 
      { 
        "id": "MAD72365139", 
        "name": "Ferretería el martillo", 
        "address": "Paseo de la tuerca, 12, 4o B" 
      } ]}, { 
    "country": "ES", 
    "city": "Barcelona", 
    "businesses": [ 
      { 
        "id": "BAR293471", 
        "name": "Farmacia Licenciado Puig", 
        "address": "Ramblas, 15, 3o D" 
      }, 
      { 
        "id": "BAR3247671", 
        "name": "La Caixa", 
        "address": "Carrer de Casp, 35" 
      }, 
      { 
        "id": "BAR3247671", 
        "name": "Panadería San Martín", 
        "address": "Carrer del Hostal, 5" 
      }, 
      { 
        "id": "BAR708569", 
        "name": "Banco Santander", 
        "address": "Passeig de Sant Joan, 475" 
      } 
    ] 
  }, { 
    "country": "FR", 
    "city": "Paris", 
    "businesses": [ 
      { 
        "id": "PAR3234871", "name": "Bistrot le Poulet", 
        "address": "66 Rue Monge" 
      }, 
      { 
        "id": "PAR32391871", 
        "name": "Crédit Agricole", 
        "address": "739 Rue de Vaugirard" 
      }, 
      { 
        "id": "PAR39918271", 
        "name": "Boulangerie Le Croissant", 
        "address": "Rue de Rennes, 5" 
      }, 
      { 
        "id": "PAR231874", 
        "name": "Boulangerie Henri", 
        "address": "Rue de Rennes, 34" 
      }, 
      { 
        "id": "PAR1214872", 
        "name": "Traiteur Saint Marc", 
        "address": "Rue Saint Marc, 33" 
      } 
    ] 
  } )
    .then(() => {
      console.log('finished populating cities');
    });
  });
