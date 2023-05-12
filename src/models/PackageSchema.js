const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    guide: { type: String, required: true },
    package: { type: String, required: true }
  }
);

const Package = mongoose.model('Package', PackageSchema)

module.exports = Package