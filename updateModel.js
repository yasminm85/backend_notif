require("dotenv").config();
const mongoose = require("mongoose");
const Disposisi = require('../backend/models/disposisi.model'); 

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    const result = await Disposisi.updateMany(
      { laporan_status: { $exists: false } },
      {
        $set: {
          laporan: null,
          laporan_file_path: null,
          laporan_status: "BELUM",
          laporan_by: null,
          laporan_at: null
        }
      }
    );

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
