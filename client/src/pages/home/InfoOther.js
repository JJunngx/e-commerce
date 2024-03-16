import classes from "./InfoOther.module.css";
const InfoOther = () => {
  return (
    <>
      <div
        className={`text-uppercase fst-italic d-flex align-items-center justify-content-evenly ${classes.bgGray}`}
      >
        <div>
          <h5>free shipping</h5>
          <p className="text-body-tertiary">free shipping worlwide</p>
        </div>
        <div>
          <h5>24 x 7 service</h5>
          <p className="text-body-tertiary">free shipping worlwide</p>
        </div>
        <div>
          <h5>festival offer</h5>
          <p className="text-body-tertiary">free shipping worlwide</p>
        </div>
      </div>

      <div className="my-5 d-flex justify-content-between align-items-center">
        <div className="fst-italic ">
          <h4 className="text-uppercase">let's be friends!</h4>
          <p className="text-body-tertiary">
            Nisi nisi tempor consequat lavoris nise.
          </p>
        </div>
        <div>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className={classes.input}
            />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InfoOther;
