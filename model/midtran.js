module.exports = (sequelize, DataTypes) => {
    const Midtran = sequelize.define(
      "tb_midtran",  // Nama tabel yang baru, sesuaikan dengan tabel yang akan digunakan
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nama: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        noTelp: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,  // Validasi email
          },
        },
        paket: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        jamAcara: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        tanggalAcara: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        instagram: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        alamatAcara: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: "tb_midtran",  // Nama tabel di database
        timestamps: true,  // Menambahkan createdAt dan updatedAt otomatis
      }
    );
  
    return Midtran;
  };
  