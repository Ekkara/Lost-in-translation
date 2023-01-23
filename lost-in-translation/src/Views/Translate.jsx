const Translate = () => {
  const signMap = new Map();
  signMap.set("a", 1);
  signMap.set("b", 2);
  signMap.set("c", 3);

  const translateStr = "abc";
  
  const translateString = (str) =>{  
    let rStr = ""
    for(let i = 0; i < str.length; i++) {
     rStr += signMap.get(str.charAt(i));   
    }
    return rStr;
  }

  return (
    <>
      <h1>Translate</h1> 
      <h2>{translateString(translateStr)}</h2>

      {
        //to do: headline
        //Input field
        //(hash)map char -> hand
        //output button
        //translate text
        //add history
        //remove old if over 10
      }
    </>
  );
};
export default Translate;
