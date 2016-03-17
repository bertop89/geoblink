'use strict';

import mongoose from 'mongoose';

var BusinessSchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String
});

var CitySchema = new mongoose.Schema({
  country: String,
  city: String,
  businesses: [BusinessSchema]
})

export default mongoose.model('City', CitySchema);
