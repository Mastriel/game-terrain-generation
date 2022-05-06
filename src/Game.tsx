import React from "react";
import GameSquare from "./components/GameSquare"


export type Tile = "Grass" | "Rock" | "Unknown"

function getTileColor(tile: Tile) {
    switch (tile) {
        case "Grass":
            return "#45fc03";
        case "Rock":
            return "#9eb396";
        case "Unknown":
            return "#ffffff";
    }
}

export default class Game {
    
    private array : Tile[][] = [[]]

    public readonly x: number
    public readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y

        // grid initialization
        for (let i = 0; i < y; i++) {
            let row : Tile[] = []
            // row initialization
            for (let i2 = 0; i2 < x; i2++) {
                row[i2] = "Unknown" 
            }
            this.array[i] = row
        }
    }

    getTileAt(x: number, y: number) : Tile {
        return this.array[x][y]
    }

    setTileAt(x: number, y: number, tile: Tile) {
        this.array[x][y] = tile
    }

    toJSXElements() : JSX.Element[][] {
        let jsxArray : JSX.Element[][] = [[]]
        // grid initialization
        for (let i = 0; i < this.y; i++) {
            // row initialization
            for (let i2 = 0; i2 < this.x; i2++) {
                let tile = this.array[i][i2]
                jsxArray[i][i2] = <GameSquare color={getTileColor(tile)}></GameSquare>
            }
        }
        return jsxArray
    }

    getNeighbors(x: number, y: number) : Tile[] {
        let tileArray : Tile[] = []
        
        tileArray.push(this.getTileAt(x-1,y-1))
        tileArray.push(this.getTileAt(x,y-1))
        tileArray.push(this.getTileAt(x+1,y-1))

        tileArray.push(this.getTileAt(x-1,y))

        tileArray.push(this.getTileAt(x+1,y))

        tileArray.push(this.getTileAt(x-1,y+1))
        tileArray.push(this.getTileAt(x,y+1))
        tileArray.push(this.getTileAt(x+1,y+1))
        return tileArray
    }
}