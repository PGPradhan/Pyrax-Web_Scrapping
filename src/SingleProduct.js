import { NavLink, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);

  const { isLoading, product, isError } = useFetch(`&i=${id}`);

  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={product.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{product.name}</p>
          <p>AMAZOn == 313 </p>
          <p>FlipCART == 377</p>
          <p className=""></p>
          <p className="card-text">{product.products2}</p>
          <p className="card-text">{product.products3}</p>
          {/* <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p> */}
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
