import { useEffect, useState } from "react";
import { StarwarsCharacter } from "./starwars_character";

interface CharacterProps {
  url: string;
}
const Character: React.FC<CharacterProps> = (props) => {
  const [characters, setCharacters] = useState<Array<StarwarsCharacter>>([{name: ""}]);
  const [apiLoaded, setAPILoaded] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const getSwapiResponse = async () => {
    try{
       const apiResponse = await fetch(props.url);
       const json = (await apiResponse.json()) as {results: StarwarsCharacter[];};
       setAPILoaded(true);
       setCharacters(json.results);
    }
    catch(error){
      if (typeof error === "string") setErrorMessage(error);
      setAPILoaded(true);
    }
   
  };
  
  useEffect(() => {
    getSwapiResponse();
  }, []);
  
  return (
    <>
       {apiLoaded?(<h3>
      Name: <label>{characters[0].name}</label>
    </h3>)
       :(<p>{errorMessage}</p>) }
    </>
   
    
  );
};

export default Character;
