import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");

    
    try {
     

      const response = await axios({
       
      
        url:import.meta.env.VITE_API_URL,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
     

      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-900 text-white font-sans p-4">
      <div className="w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 space-y-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Chat AI</h1>
      
        
        <form onSubmit={generateAnswer} className="space-y-6">
          <textarea
            required
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-gray-500 text-gray-800 transition duration-300"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
          ></textarea>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold transition-all duration-300 transform hover:bg-indigo-500 hover:scale-105 ${
              generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating Answer..." : "Get Answer"}
          </button>
        </form>

        <div className="w-full rounded-lg bg-gray-50 p-6 mt-4 text-gray-800 transition-transform transform hover:scale-105">
          <ReactMarkdown className="whitespace-pre-wrap">{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
