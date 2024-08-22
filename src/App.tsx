import PhonemeCount from "./Components/PhonemeCount/PhonemeCount";
import PhoneCount from "./Components/PhoneCount/PhoneCount";
import CSVAnalysis from "./Components/CSVAnalysis/CSVAnalysis";
import "./App.css";
import TabContainer from "./Components/TabContainer/TabContainer";

function App() {
  const componentArray = [
    {
      index: 0,
      tabName: "Phoneme Count",
      component: PhonemeCount,
    },
    {
      index: 1,
      tabName: "Phone Count",
      component: PhoneCount,
    },
    {
      index: 2,
      tabName: "CSV Analysis",
      component: CSVAnalysis,
    },
  ];

  return (
    <div className="App">
      <h1>Phonemic and Phonetic Analysis</h1>
      <TabContainer list={componentArray}></TabContainer>
    </div>
  );
}

export default App;
