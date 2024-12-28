import { useState, useEffect } from 'react';
import './aboutUs.css';

export default function AboutUs() {
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Ødegaard', position: 'Chief Executive Officer', image: 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Odegaard-New.jpg?h=74c28fda&auto=webp&itok=jNDebJPQ' },
    { name: 'Codina', position: 'Legal Advisor', image: 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Codina_0.jpg?h=74c28fda&auto=webp&itok=Itq8n-zS' },
    { name: 'Havertz', position: 'Adoption Counselor', image: 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Havertz-New.jpg?h=74c28fda&auto=webp&itok=OBX0EvhX' },
    { name: 'Timber', position: 'Marketing Manager', image: 'https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Timber_0.png?h=74c28fda&auto=webp&itok=4XbbyMal' },
  ]);

  return (
    <div className="about-us">
      <h2 className="section-title">Our Dev Team</h2>
      <div className="gallery">
        {teamMembers.map((member, index) => (
          <figure className="card" key={index}>
            <img src={member.image} alt={`${member.name}'s portrait`} />
            <figcaption className="overlay-text">
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <h2 className="section-title">Our Mission</h2>
      <p className="section-text">
      We are deeply committed to delivering exceptional services to our clients worldwide. Our dedicated team works tirelessly to meet and exceed customer expectations, fostering lasting relationships built on trust and reliability. We continuously strive for excellence by embracing innovation, ensuring our solutions are not only effective but also aligned with the evolving needs of our clients. With a focus on customer satisfaction and sustainable growth, we aim to empower businesses and individuals alike, supporting their success at every stage of their journey.
      </p>

      <h2 className="section-title">Our History</h2>
      <p className="section-text">
      Founded in 2010, our company has steadily expanded its presence on a global scale. What began as a small, dedicated team of passionate professionals has evolved into a dynamic organization, recognized as a leading player in our industry. Over the years, we have built a strong reputation for delivering high-quality services, continuously adapting to market demands and technological advancements. Our growth is a testament to the hard work, commitment, and vision of our team, who are focused on driving innovation and achieving excellence in everything we do.
      </p>
    </div>
  );
}
