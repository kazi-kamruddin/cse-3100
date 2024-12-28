import { useEffect, useState } from 'react';

const featuredCats = [
  { name: 'Whiskers', age: '2', breed: 'Sphynx' },
  { name: 'Mittens', age: '2', breed: 'Birman' },
  { name: 'Shadow', age: '1', breed: 'Abyssinian' },
  { name: 'Fluffy', age: '1', breed: 'Persian' },
  { name: 'Willow', age: '2', breed: 'Peterbald' },
  { name: 'Clover', age: '1', breed: 'Siamese' }, 
];

export default function Home() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(featuredCats.map(() => 
          fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json())
        ));

        const catsWithImages = featuredCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cat images:', error);
        setLoading(false);
      }
    };

    fetchCatImages();
  }, []);

  const handleAdoptClick = (cat) => {
    console.log('Adopt Now clicked for:', cat);
  };

  return (
    <>
      <section className="text-center mt-4">
        <h2>Welcome to Purrfect Adoption</h2>
        <p>
          At Purrfect Adoption, we believe every cat deserves a loving home. Whether you're looking for a playful kitten or a gentle senior companion, we’re here to help you find your perfect match.
        </p>
      </section>

      <section className="mt-5">
        <h2>Featured cats</h2>

        {loading ? (
          <div className="loading-message">
            <p>Wait a while, loading featured cats...</p>
          </div>
        ) : (
          <div className="mt-2 row g-4" id="cats-container">
            {cats.map((cat, i) => (
              <div key={i} className="col-md-4">
                <div className="cat-card">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="img-fluid mb-2" 
                    style={{ borderRadius: '8px', height: '200px', objectFit: 'cover' }} 
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
      </section>
    </>
  );
}
