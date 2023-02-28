import { useEffect, useState } from "react";

interface CharacterProps {
  url: string;
}
const Character: React.FC<CharacterProps> = (props) => {
  const [character, setCharacters] = useState<string>("");
  const [apiLoaded, setAPILoaded] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const getSwapiResponse = async () => {
    try{
       const apiResponse = await fetch(props.url);
       if (apiResponse.ok) {
        const json = await apiResponse.json();
        setAPILoaded(true);
        setCharacters(json.name);
       }else{
        throw new Error();
       }
       
    }
    catch(error){
      setErrorMessage("Oops, failed to fetch!");
      console.log(error);
      setAPILoaded(false);
    }
   
  };
  
  useEffect(() => {
    getSwapiResponse();
  }, []);
  
  return (
    <>
      {apiLoaded ? (
        <h3>
          Name: <label>{character}</label>
        </h3>
      ) : (
        <p role="alert">{errorMessage}</p>
      )}
    </>
  );
};

export default Character;
