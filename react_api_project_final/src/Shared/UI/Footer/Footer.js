const Footer = () => {
  return (
    <footer
      className=" text-center text-dark"
      style={{
        backgroundColor: "#e3f2f5",
        position: "absolute",
        width: "100%",
        height: "6rem",
        //left: 0,
        bottom: 0,
      }}
    >
      <div className="container p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-dark btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-dark btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-dark btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-dark btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-dark btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-outline-dark btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>

        {/* <section className="mb-4"> 
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          distinctio earum repellat quaerat voluptatibus placeat nam, commodi
          optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi
          voluptate quas.
        </p>
         </section>  */}
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright:
        <a className="text-white" href="https://www.benchmarkit.solutions/">
          Benchmark IT Solutions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
