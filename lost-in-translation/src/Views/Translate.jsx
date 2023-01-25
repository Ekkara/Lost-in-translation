import { useEffect } from "react"
import { useState } from "react"
import { translationAdd } from "../api/translate"
import { userById } from "../api/user"
import { useUser } from "../context/UserContext"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"
import { STORAGE_KEYS_USER } from "../const/storageKeys"
import "../css/translate.css"
import "../css/nav.css"
import a from "../components/individial_signs/a.png"
import b from "../components/individial_signs/b.png"
import c from "../components/individial_signs/c.png"
import d from "../components/individial_signs/d.png"
import e from "../components/individial_signs/e.png"
import f from "../components/individial_signs/f.png"
import g from "../components/individial_signs/g.png"
import h from "../components/individial_signs/h.png"
import i from "../components/individial_signs/i.png"
import j from "../components/individial_signs/j.png"
import k from "../components/individial_signs/k.png"
import l from "../components/individial_signs/l.png"
import m from "../components/individial_signs/m.png"
import n from "../components/individial_signs/n.png"
import o from "../components/individial_signs/o.png"
import p from "../components/individial_signs/p.png"
import q from "../components/individial_signs/q.png"
import r from "../components/individial_signs/r.png"
import s from "../components/individial_signs/s.png"
import t from "../components/individial_signs/t.png"
import u from "../components/individial_signs/u.png"
import v from "../components/individial_signs/v.png"
import w from "../components/individial_signs/w.png"
import x from "../components/individial_signs/x.png"
import y from "../components/individial_signs/y.png"
import z from "../components/individial_signs/z.png"
import space from "../components/individial_signs/space.png"

const SIGN_SIZE = 25
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
  signMap.set("a", a)
  signMap.set("b", b)
  signMap.set("c", c)
  signMap.set("d", d)
  signMap.set("e", e)
  signMap.set("f", f)
  signMap.set("g", g)
  signMap.set("h", h)
  signMap.set("i", i)
  signMap.set("j", j)
  signMap.set("k", k)
  signMap.set("l", l)
  signMap.set("m", m)
  signMap.set("n", n)
  signMap.set("o", o)
  signMap.set("p", p)
  signMap.set("q", q)
  signMap.set("r", r)
  signMap.set("s", s)
  signMap.set("t", t)
  signMap.set("u", u)
  signMap.set("v", v)
  signMap.set("w", w)
  signMap.set("x", x)
  signMap.set("y", y)
  signMap.set("z", z)

  const [translateTxt, setTranslateTxt] = useState("")
  const [translatedTxt, setTranslatedTxt] = useState("")

  const translate = (str) =>{
    str = str.toLowerCase()
    let rElements = []

    for(let i = 0; i < str.length; i++){
      let char = str.charAt(i)

      if(char.match(/[a-z]/)){
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
      else if(char === " "){
        rElements.push(
          <img
            src={space}
            alt={char}
            key={"char: " + i}
            width={SIGN_SIZE + "px"}
            height={SIGN_SIZE + "px"}
          />
        )
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

        <div class="center">
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