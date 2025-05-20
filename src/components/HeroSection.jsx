import styles from "../styles//Hero.module.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      {" "}
      <div className={`${styles.heroOverlay}`}></div>{" "}
      <div className="container d-flex align-items-center flex-wrap">
        <div className={styles.heroContent}>
          <h1>
            Delicious Food <span className={styles.highlight}>Delivered</span>{" "}
            To Your Door
          </h1>
          <p className="lead fs-4">
            Order from your favorite local restaurants with free delivery for
            your first month. Fast delivery, amazing service, and the food you
            love.
          </p>

          <div className={`${styles.heroButtons} mb-4`}>
            <Link
              to="#order"
              className={`${styles.primaryBtn} btn btn-lg btn-danger me-2`}
            >
              Order Now
            </Link>
            <Link
              to="#restaurants"
              className={`${styles.secondaryBtn} btn btn-lg  `}
            >
              View Restaurants
            </Link>
          </div>

          <div className={`${styles.heroStats} d-flex`}>
            <div className={`${styles.statItem} me-4`}>
              <span className={`${styles.statNumber} d-block`}>500+</span>
              <span className={styles.statLabel}>Restaurants</span>
            </div>
            <div className={`${styles.statItem} me-4`}>
              <span className={`${styles.statNumber} d-block`}>30k+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statItem}>
              <span className={`${styles.statNumber} d-block`}>15min</span>
              <span className={styles.statLabel}>Delivery Time</span>
            </div>
          </div>
        </div>

        <div className={`${styles.heroImageContainer} position-relative `}>
          {" "}
          <img
            src="https://img.freepik.com/free-photo/side-view-eggplant-roll-grilled-eggplant-with-walnut-pomegranate-cucumber-lettuce-plate_141793-4891.jpg?t=st=1746949578~exp=1746953178~hmac=6235117a224b7e52a275c0d0e826cf53e4d43e899a1bab9372646b587b123227&w=1380"
            alt="Delicious food plate"
            className={`${styles.heroImg} img-fluid`}
            style={{
              borderRadius: "50px",
            }}
          />
          <div className={`${styles.foodCard} ${styles.card1} w-50`}>
            <img
              src="https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3790.jpg?t=st=1746950187~exp=1746953787~hmac=70ff32e297542fd09fc1e63253c8881353ec954cb761ba7eeddb9b3f55420ffb&w=1380"
              alt="Pizza"
              className="rounded img-fluid w-75"
            />
            <div className={`${styles.cardInfo} ms-1`}>
              <h4>Italian Pizza</h4>
              <p className="mb-0">GH₵49.99</p>
              <div className={styles.rating}>★★★★★</div>
            </div>
          </div>
          <div className={`${styles.foodCard} ${styles.card2} w-50`}>
            <img
              src="https://img.freepik.com/free-photo/juicy-cheeseburger-rustic-wooden-board_9975-24623.jpg?t=st=1746949969~exp=1746953569~hmac=76cc940e7d55e3bc181c8fa5882ac88f2542b1bd63a828b7b565dfd028679f91&w=1800"
              alt="Burger"
              className="rounded img-fluid w-75"
            />
            <div className={`${styles.cardInfo} ms-1`}>
              <h4>Classic Burger</h4>
              <p className="mb-0">GH₵199.99</p>
              <div className={styles.rating}>★★★★☆</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
