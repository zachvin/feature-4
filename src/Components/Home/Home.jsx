import Nav from "../Shared/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <section className="w-2/3 h-screen flex flex-col justify-center mx-52">
        <h1 className="font-extrabold text-7xl text-indigo-900 p-4">
          Get high-quality human feedback.{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-sky-500 to-emerald-300 inline-block text-transparent bg-clip-text">
            Instantly.
          </span>
        </h1>
        <h2 className="font-medium text-md p-4">
          Automatically get your neural network connected to thousands of
          testers.
        </h2>
      </section>
    </>
  );
}
