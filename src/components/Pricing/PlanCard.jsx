import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PlanCard = ({ name, price, features, onSelect, status }) => {
  const getButtonText = () => {
    switch (status) {
      case "current":
        return "Current Plan";
      case "available":
        return `Get ${name} Plan`;
      case "included":
        return "Included in Your Plan";
      default:
        return "Select Plan";
    }
  };

  const isButtonDisabled = status !== "available";

  return (
    <div className={`pricing__card pricing__card--${name.toLowerCase()}`}>
      {/* Plan Title Section */}
      <div className="pricing__plan--title">
        <span>{name}</span>
        {name === "Pro" && (
          <span className="pricing__plan--tag">Popular Choice</span>
        )}
        {status === "current" && (
          <span className="pricing__plan--subscribed">Subscribed</span>
        )}
      </div>

      {/* Plan Price Section */}
      <div className="pricing__plan--contain">
        <span className="pricing__plan--price">
          {typeof price === "number" ? `₹${price}` : price}
        </span>
        <span className="pricing__plan--per">Per user/month</span>
      </div>

      {/* Plan Features Section */}
      <div className="pricing__features">
        {features.map((feature, index) => (
          <div key={index} className="pricing__feature">
            <IoMdCheckmarkCircleOutline className="pricing__feature--icon" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`pricing__btn ${status}`}
        onClick={onSelect}
        disabled={isButtonDisabled}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default PlanCard;
