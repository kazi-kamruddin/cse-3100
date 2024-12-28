import { useEffect, useState } from 'react';
import './availableCats.css';

const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Sphynx' },
  { name: 'Mittens', age: '2', breed: 'Birman' },
  { name: 'Shadow', age: '1', breed: 'Abyssinian' },
  { name: 'Pumpkin', age: '3', breed: 'Siamese' },
  { name: 'Luna', age: '4', breed: 'Birman' },
  { name: 'Simba', age: '2', breed: 'Siamese' },
  { name: 'Fluffy', age: '1', breed: 'Persian' },
  { name: 'Willow', age: '2', breed: 'Peterbald' },
  { name: 'Clover', age: '1', breed: 'Abyssinian' },
  { name: 'Hamilton', age: '2', breed: 'Siamese' },
  { name: 'Alonso', age: '2', breed: 'Persian' },
  { name: 'Sainz', age: '1', breed: 'Birman' },
  { name: 'Stroll', age: '1', breed: 'Siamese' },
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() =>
            fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json())
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setFilteredCats(catsWithImages); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cat images:', error);
        setLoading(false); 
      }
    };

    fetchCatImages();
  }, []);

  const handleBreedFilterChange = (e) => {
    const value = e.target.value;
    setBreedFilter(value);
    applyFilters(value, nameSearch);
  };

  const handleNameSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setNameSearch(value);
    applyFilters(breedFilter, value);
  };

  const applyFilters = (breed, name) => {
    let updatedCats = cats;

    if (breed) {
      updatedCats = updatedCats.filter((cat) => cat.breed === breed);
    }

    if (name) {
      updatedCats = updatedCats.filter((cat) =>
        cat.name.toLowerCase().includes(name)
      );
    }

    setFilteredCats(updatedCats);
  };

  const uniqueBreeds = [...new Set(availableCats.map((cat) => cat.breed))];

  return (
    <section className="text-center mt-4">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <div className="header-text">
          <h2>Available Cats</h2>
          <p>Meet our adorable cats looking for their forever home!</p>
        </div>
        <div className="filters align-items-center" id="filters">
          <div className="me-3">
            <label htmlFor="breed-filter" className="form-label">
              Filter by Breed:
            </label>
            <select
              id="breed-filter"
              className="form-select filter-dropdown"
              value={breedFilter}
              onChange={handleBreedFilterChange}
            >
              <option value="">All Breeds</option>
              {uniqueBreeds.map((breed, i) => (
                <option key={i} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name-search" className="form-label">
              Search by Name:
            </label>
            <input
              id="name-search"
              type="text"
              className="form-control search-bar"
              placeholder="Enter cat name"
              value={nameSearch}
              onChange={handleNameSearchChange}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">
          <p>Loading list of cats, please wait...</p>
        </div>
      ) : (
        <div className="mt-2 row g-4 cats-container" id="cats-container">
          {filteredCats.map((cat, i) => (
            <div key={i} className="col-md-4">
              <div className="cat-card">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="img-fluid mb-2"
                  style={{
                    borderRadius: '8px',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
                <div className="cat-info">
                  <h3 className="h5 mb-1">{cat.name}</h3>
                  <p className="mb-0">Age: {cat.age}</p>
                  <p className="mb-0">Breed: {cat.breed}</p>
                  <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleAdoptClick(cat)}
                    >
                      Adopt Now
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCats.length === 0 && !loading && (
        <p className="mt-4 text-muted">No cats found matching the filters.</p>
      )}
    </section>
  );
}
