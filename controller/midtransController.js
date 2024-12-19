const midtransClient = require("midtrans-client");
require("dotenv").config();
const {
  models: { midtrans },
} = require("../model/index.js");

// console.log(midtransClient);

// Inisialisasi Snap Midtrans dengan kunci API
// const snap = new midtransClient.Snap({
//     isProduction: false, // Ganti ke true saat di produksi
//     serverKey: 'SB-Mid-server-zGJKoaVX7KRsqGFLdsCGyqMd', // Ambil server key dari environment variable
//     clientKey: 'SB-Mid-client-UCUldLprRYc4FS4U', // Ambil client key dari environment variable
// });
const snap = new midtransClient.Snap({
  isProduction: false, // Ganti ke true saat di produksi
  serverKey: process.env.SECRET, // Ambil server key dari environment variable
  clientKey: process.env.NEXT_PUBLIC_CLIENT, // Ambil client key dari environment variable
});

exports.createMidtrans = async (req, res) => {
  const {
    nama,
    noTelp,
    email,
    paket,
    jamAcara,
    tanggalAcara,
    instagram,
    alamatAcara,
  } = req.body;

  try {
    // Parameter transaksi untuk Midtrans
    let parameter = {
      transaction_details: {
        order_id: `ORDER-${Math.floor(Math.random() * 1000000)}`, // ID order unik
        gross_amount: 1000000, // Total jumlah transaksi (hardcoded untuk saat ini)
      },
      item_details: [
        {
          name: paket, // Nama produk (paket yang dipilih)
          price: 1000000, // Harga produk per unit (contoh harga)
          quantity: 1, // Jumlah produk
        },
      ],
      customer_details: {
        first_name: nama,
        email: email,
        phone: noTelp,
        address: alamatAcara,
      },
    };

    try {
      // const token = await snap.createTransactionToken(parameter);

      const newMitrans = await midtrans.create({
        nama,
        noTelp,
        email,
        paket,
        jamAcara,
        tanggalAcara,
        instagram,
        alamatAcara,
      });

      // Mengembalikan respons sukses dengan token dan data booking
      res.status(201).json({ booking: newMitrans, parameter });
    } catch (error) {
        res.status(500).json({ error: "Failed to update Midtarns" });
    }

    // Membuat token transaksi menggunakan Snap Midtrans

    // Menyimpan data booking ke dalam database
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ error: "Failed to create booking or transaction token" });
  }
};
exports.createMidtransPaymentLink = async (req, res) => {
  const {
    nama,
    noTelp,
    email,
    paket,
    jamAcara,
    tanggalAcara,
    instagram,
    alamatAcara,
  } = req.body;

  try {
    // Parameter transaksi untuk Midtrans
    let parameter = {
      transaction_details: {
        order_id: `ORDER-${Math.floor(Math.random() * 1000000)}`, // ID order unik
        gross_amount: 1000, // Total jumlah transaksi (hardcoded untuk saat ini)
      },
      item_details: [
        {
          name: paket, // Nama produk (paket yang dipilih)
          price: 1000, // Harga produk per unit (contoh harga)
          quantity: 1, // Jumlah produk
        },
      ],
      customer_details: {
        first_name: nama,
        email: email,
        phone: noTelp,
        address: alamatAcara,
      },
    };

    try {
      // const token = await snap.createTransactionToken(parameter);

      const newMitrans = await midtrans.create({
        nama,
        noTelp,
        email,
        paket,
        jamAcara,
        tanggalAcara,
        instagram,
        alamatAcara,
      });

      // Mengembalikan respons sukses dengan token dan data booking
      res.status(201).json({ booking: newMitrans, parameter });
    } catch (error) {
        res.status(500).json({ error: "Failed to update Midtarns" });
    }

    // Membuat token transaksi menggunakan Snap Midtrans

    // Menyimpan data booking ke dalam database
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ error: "Failed to create booking or transaction token" });
  }
};

exports.getMidtrans = async (req, res) => {
  try {
    const bookings = await midtrans.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.updateMidtrans = async (req, res) => {
  const { id } = req.params;
  const {
    nama,
    noTelp,
    email,
    paket,
    jamAcara,
    tanggalAcara,
    instagram,
    alamatAcara,
  } = req.body;

  try {
    const booking = await midtrans.findByPk(id);
    if (booking) {
      await booking.update({
        nama,
        noTelp,
        email,
        paket,
        jamAcara,
        tanggalAcara,
        instagram,
        alamatAcara,
      });
      res.status(200).json(booking);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
};

exports.deleteMidtrans = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await midtrans.findByPk(id);
    if (booking) {
      await booking.destroy();
      res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
