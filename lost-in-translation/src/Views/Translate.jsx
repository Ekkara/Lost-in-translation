import { useEffect } from "react"
import { useState } from "react"
import { translationAdd } from "../api/translate"
import { userById } from "../api/user"
import { useUser } from "../context/UserContext"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"
import { STORAGE_KEYS_USER } from "../const/storageKeys"
import space from "../components/individial_signs/space.png"
import "../css/translate.css"
import "../css/nav.css"

const SIGN_SIZE = 55
const MAX_CHAR_LENGTH = 40

const Translate = () =>{
  const { user, setUser } = useUser()

  useEffect(() =>{
    const findUser = async() =>{
      const [error, latestUser] = await userById(user.id)

      if(error === null){
        storageSave(STORAGE_KEYS_USER, latestUser)
        setUser(latestUser)
      }
    }

    findUser()
  }, [setUser, user.id])

  const signMap = new Map()
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  alphabet.forEach(letter => {
    signMap.set(letter, require(`../components/individial_signs/${letter}.png`))
  });
  signMap.set(" ", space)

  const [translateTxt, setTranslateTxt] = useState("")
  const [translatedTxt, setTranslatedTxt] = useState("")

  const translate = (str) =>{
    str = str.toLowerCase()
    let rElements = []

    for(let i = 0; i < str.length; i++){
      let char = str.charAt(i)

      if(char.match(/[a-z]/) || char === " "){
        // thank you JaredPar! https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
        rElements.push(
          <img
            src={signMap.get(char)}
            alt={char}
            key={"char: " + i}
            width={SIGN_SIZE + "px"}
            height={SIGN_SIZE + "px"}
          />
        )
      }
      else{
        alert(`${char} is not a valid character, please only use a-z or spaces`)
        setTranslatedTxt("")
        return
      }
    }

    return rElements
  }

  const translateButtonClick = async() =>{
    await setTranslatedTxt(translate(translateTxt))

    if(translateTxt.length <= 0){
      alert("nothing to translate")
      return
    }

    const [error, updateUser] = await translationAdd(user, translateTxt)
    if(error !== null){
      return
    }

    storageSave(STORAGE_KEYS_USER, updateUser)
    setUser(updateUser)
  }

  return(
    <>
      <h1>Translate</h1>
      <div id="translateHolder">
        <div id="translationInput">
          <textarea
            onChange={(inputBox) =>{
              if(inputBox.target.value.length >= MAX_CHAR_LENGTH){
                inputBox.target.value = inputBox.target.value.substring(0,MAX_CHAR_LENGTH - 1)
                alert(`You can only translate a maximum of ${MAX_CHAR_LENGTH} characters`)
              }

              setTranslateTxt(inputBox.target.value);
            }}

            placeholder="Enter your text here!"
          ></textarea>
        </div>

        <div className="center">
          <button
            onClick={() =>{
              translateButtonClick()
            }}
          >
            Translate
          </button>
        </div>
        <div id="translateOutput">{translatedTxt}</div>
      </div>
    </>
  )
}

export default withAuth(Translate)