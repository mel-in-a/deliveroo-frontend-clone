import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
      <FontAwesomeIcon icon="space-shuttle" size="2x"/>
      </div>

      <div className="title">Deliveroo</div>
    </div>
  );
};

export default Header;
