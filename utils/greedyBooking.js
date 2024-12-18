// utils/greedyBooking.js
const greedyBooking = async (vendors, requiredSlots) => {
    vendors.sort((a, b) => a.price - b.price); // Urutkan berdasarkan harga terendah
    for (let vendor of vendors) {
      if (vendor.availableSlots >= requiredSlots) {
        return vendor;
      }
    }
    throw new Error('No available vendor for the required slots');
  };
  
  module.exports = greedyBooking;
  