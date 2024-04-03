import hero1 from "./assets/hero1.png";
// import background from "./assets/background.jpg";

const Hero = () => {
  return (
    <div
      // style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
      className=" flex"
    >
      <div className="ml-28 w-96 mt-40">
        <h1 className="text-4xl text-slate-800 mb-8 font-bold select-none">
          Accueillez un nouveau
          <br /> membre dans votre famille.
        </h1>
        <p className="text-xl select-none">Adoptez votre compagnon</p>
        <div>
          <a
            href="#pets"
            className="bg-amber-400 rounded-2xl rounded-5 text-xl font-bold p-2.5 select-none"
          >
            <button className="mt-4 ">Rencontrez nos animaux !!</button>
          </a>
        </div>
      </div>
      <div className="relative w-7/12 mr-12">
        <img className="absolute mt-44 z-0" src={hero1} alt="" />
      </div>
    </div>
  );
};

export default Hero;
