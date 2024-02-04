import React, { useState } from 'react';
import './SeatBooking.css';

const movies = [
  { id: 1, name: 'Avengers Endgame', price: 200 },
  { id: 2, name: 'Spider-Man: No Way Home', price: 300 },
  { id: 3, name: 'The Matrix Resurrections', price: 250 },
  { id: 4, name: "The King's Man", price: 200 },
  { id: 5, name: 'Sing 2', price: 150 },
  { id: 6, name: 'West Side Story', price: 250 },
];

const SeatBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeatsMap, setSelectedSeatsMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookedSeatsByMovie, setBookedSeatsByMovie] = useState({});

  const handleMovieSelect = (event) => {
    const movieId = parseInt(event.target.value);
    const movie = movies.find((m) => m.id === movieId);

    setSelectedSeatsMap({});
    setTotalPrice(0);
    setSelectedMovie(movie);

    if (!bookedSeatsByMovie[movieId]) {
      setBookedSeatsByMovie({ ...bookedSeatsByMovie, [movieId]: {} });
    }
  };

  const handleSeatSelect = (seat) => {
    const newSelectedSeats = { ...selectedSeatsMap };
    newSelectedSeats[seat.number] = { ...seat, color: 'green' };

    setSelectedSeatsMap(newSelectedSeats);

    const newTotalPrice = Object.keys(newSelectedSeats).length * selectedMovie.price;
    setTotalPrice(newTotalPrice);
  };

  const handleBook = () => {
    const newBookedSeats = { ...bookedSeatsByMovie[selectedMovie.id], ...selectedSeatsMap };
    setBookedSeatsByMovie({ ...bookedSeatsByMovie, [selectedMovie.id]: newBookedSeats });
    setSelectedSeatsMap({});
    setTotalPrice(0);
  };

  const renderSeats = () => {
    const seats = [];
    for (let j = 0; j < 6; j++) {
      const row = [];
      for (let i = 0; i < 8; i++) {
        const seatNumber = i + j * 8;
        const isSeatSelected = selectedSeatsMap.hasOwnProperty(seatNumber);
        const isSeatBooked = bookedSeatsByMovie[selectedMovie.id]?.hasOwnProperty(seatNumber);
        const seatColor = isSeatSelected ? 'green' : isSeatBooked ? 'black' : 'white';

        row.push(
          <label key={seatNumber} className="checkbox-label">
            <input
              type="checkbox"
              checked={isSeatSelected}
              onChange={() => handleSeatSelect({ number: seatNumber })}
              disabled={isSeatBooked}
              className={`plain-checkbox ${seatColor === 'black' ? 'color-black' : seatColor === 'green' ? 'color-green' : 'color-white'}`}
            />
          </label>
        );
      }
      seats.push(<div key={j} className="row">{row}</div>);
    }
    return seats;
  };

  return (
    <div className="seat-booking-container">
      <div className="movie-selection">
        <h1>Select a Movie:</h1>
        <select onChange={handleMovieSelect}>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.name} (₹ {movie.price})
            </option>
          ))}
        </select>
      </div>
   
      <div className="seat-grid">
      <div className="legend">
          <div className="legend-item">
            <div className="color-white"></div>
            <span>N/A</span>
          </div>
          <div className="legend-item">
            <div className="color-green"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="color-black"></div>
            <span>Occupied</span>
          </div>
        </div>
        <div className="seat-container">
          {renderSeats()}
        </div>
      </div>
      <div>
        <h5 className="summary">You have selected {Object.keys(selectedSeatsMap).length} seats for a price of ₹ {totalPrice}</h5>
      </div>
      <button className='book-button' onClick={handleBook}>Book</button>
    </div>
  );
};

export default SeatBooking;

