import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero_section">
      <div className="align_center">
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <Link to={link} className="hero_link">
          바로구매
        </Link>
      </div>

      <div className="align_center">
        <img src={image} alt="" className="hero_image" />
      </div>
    </section>
  );
};

export default HeroSection;
