import { useNavigate, Link } from "react-router-dom";
import Nav from "../Shared/Nav";

export default function About() {
  const history = useNavigate();

  // go to home page
  const buttonHandler = () => {
    history("/");
  };

  return (
    <>
      <Nav />
      <section className="mt-32 text-gray-800 w-1/2 mx-auto text-xl">
        <div className="my-16">
          <h1 className="text-4xl text-gray-900 font-semibold">
            What is Testify?
          </h1>
          <p>
            Machine learning engineers shouldn't have to be network engineers,
            too. Testify gets rid of the complex hosting process so that you can
            get right to public beta testing.
          </p>
        </div>
        <div className="my-16">
          <h1 className="text-4xl text-gray-900 font-semibold">
            How do I use Testify?
          </h1>
          <p>
            Simply upload a Docker image, give a title and description, and
            you're good to go!
          </p>
          <p>Docker images need to fulfill a few requirements:</p>
          <ol className="list-decimal p-8">
            <li>
              Wrap your network in an API that listens for POST requests on port
              80. The request body has an input field that will contain the data
              for your network.
            </li>
            <li>
              It is most common to use /predict as your API endpoint, although
              you can change it to whatever you want. Be sure to specify the
              endpoint during model submission.
            </li>
            <li>
              Make sure cross origin requests are enabled. This is easily
              achievable with Python's FastAPI.
            </li>
            <li>
              Use docker image save to get the .tar file. This is what you
              upload.
            </li>
            <li>
              Host and go! Depending on Docker image size, the model is usually
              ready to go less than a minute after cliking submit. Your model
              IP, port, and hardware needs are taken care of for you.
            </li>
            <li>
              To use your new model, simply navigate to the dashboard, select
              your network from the dropdown, and send your input!
            </li>
          </ol>
          <Link
            to="/models"
            className="m-3 self-start bg-indigo-500 text-gray-100 px-4 py-2 rounded-full hover:bg-indigo-700 transition-all"
          >
            Try it out
          </Link>
        </div>
        <div className="my-16">
          <h1 className="text-4xl text-gray-900 font-semibold">
            How much does Testify cost?
          </h1>
          <p>$1,000,000 (no exceptions)</p>
        </div>
      </section>
    </>
  );
}
