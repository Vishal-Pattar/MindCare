import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PlanCard = ({ name, price, features, onSelect, isSubscribed }) => (
  <div className={`pricing__card pricing__card--${name.toLowerCase()}`}>
    <div className="pricing__plan--title">
      <span>{name}</span>
      {name === "Pro" && <span className="pricing__plan--tag">Popular Choice</span>}
      {isSubscribed && <span className="pricing__plan--subscribed">Subscribed</span>}
    </div>
    <div className="pricing__plan--contain">
      <span className="pricing__plan--price">
        {typeof price === "number" ? `₹${price}` : price}
      </span>
      <span className="pricing__plan--per">Per user/month</span>
    </div>
    <div className="pricing__features">
      {features.map((feature, index) => (
        <div key={index} className="pricing__feature">
          <IoMdCheckmarkCircleOutline className="pricing__feature--icon"/>
          <span>{feature}</span>
        </div>
      ))}
    </div>
    <button className="pricing__btn" onClick={onSelect} disabled={isSubscribed}>
      {isSubscribed ? "Subscribed" : `Get ${name} Plan`}
    </button>
  </div>
);

export default PlanCard;
