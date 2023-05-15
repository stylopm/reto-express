const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema(
  {
    shipping_id: { type: String, required: true },
    guide: { type: String, required: true },
    package: { type: String, required: true },
    status: { type: String, required: true },
    updatedate : { type: Date } 
  }
);

const Package = mongoose.model('Package', PackageSchema)

module.exports = Package