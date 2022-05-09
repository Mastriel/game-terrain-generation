import { CSSProperties } from "react"
import { Type } from "typescript"
import Game from "../Game"
import { GameSettings } from "./GameComponent"


export type GameSettingProps<T extends GameSettingType> = {
    defaultValue: T,
    label: string,
    setter: (value: T) => void,
    getter: () => T
}

export type GameSettingType = string | number | boolean

export function GameSetting<T extends GameSettingType>(props: GameSettingProps<T>) {
    
    let element : JSX.Element = <></>

    if (typeof props.defaultValue === "number") {
        element = (
            <input className="text-white bg-slate-900 text-center w-14 rounded-lg" onChange={(e) => {
                let number = Number.parseInt(e.target.value)
                props.setter(number as T)
            }} defaultValue={props.defaultValue.toString()}/>
        )
    }

    let style : CSSProperties = {
        transform: `translate(0px, 2px)`
    }

    return (
        <div className="w-min">
            <p className="text-base" style={style}>{props.label}</p>
            {element}
        </div>
    )
}
