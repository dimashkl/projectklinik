import React from 'react';

class cobajadwal extends React.Component {
  handleHourButtonClick = (hour) => {
    // Menghandle aksi ketika tombol jam ditekan
    console.log('Jam yang dipilih:', hour);
    // Lakukan aksi lainnya sesuai kebutuhan
  };

  render() {
    const startHour = 7; // Jam mulai
    const endHour = 12; // Jam selesai
    const hourButtons = [];

    for (let i = startHour; i <= endHour; i++) {
        hourButtons.push(
          <button
            key={i}
            onClick={() => this.handleHourButtonClick(i)}
          >
            {i < 10 ? '0' + i + ':00' : i + ':00'}
          </button>
        );
      }
  
      return (
        <div>
          <h1>Pilih Jam Kerja</h1>
          {hourButtons}
        </div>
      );
    }
  }
  
  export default cobajadwal;