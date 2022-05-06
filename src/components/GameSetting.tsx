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
    return (
        <div>
            
        </div>
    )
}