import React from "react";
import { CSSProperties } from "react";
import { gameSize } from "./components/GameComponent";
import GameSquare from "./components/GameSquare"
import { TilemapGenerator } from "./tilemap/TilemapGenerator";


let tileTypes = ["Grass", "Dirt", "Rock", "Water", "Sand", "Unknown"] as const
export type Tile = "Grass" | "Dirt" | "Rock" | "Water" | "Sand" | "Unknown"

function getTileColor(tile: Tile) {
    switch (tile) {
        case "Grass":
            return "#45fc03";
        case "Dirt":
            return "#ba8900";
        case "Rock":
            return "#9eb396";
        case "Sand":
            return "#fff47a";
        case "Water":
            return "#69ffe1";
        case "Unknown":
            return "#ffffff";
    }
}

export default class Game {
    
    private array: Tile[][] = [[]]

    public readonly sizeX: number
    public readonly sizeY: number
    private readonly tilemapGenerator: TilemapGenerator

    constructor(x: number, y: number, tilemapGenerator: TilemapGenerator) {
        this.sizeX = x
        this.sizeY = y
        this.tilemapGenerator = tilemapGenerator
        this.tilemapGenerator.game = this

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

    /**
     * Generate the map.
     */
    generateTilemap() {
        this.tilemapGenerator.generate()
    }

    getTileAt(x: number, y: number) : Tile | undefined {
        try {
            if (this.array.length < y) return undefined
            if (this.array[x].length < x) return undefined
        } catch {
            return undefined
        }
        return this.array[x][y]
    }

    setTileAt(x: number, y: number, tile: Tile) {
        if (x > this.sizeX) return
        if (y > this.sizeY) return
        this.array[x][y] = tile
    }

    toJSXElements() : JSX.Element[] {
        let jsxArray : JSX.Element[] = []
        // grid initialization
        for (let i = 0; i < this.sizeY; i++) {
            // row initialization
            let row : JSX.Element[] = []
            for (let i2 = 0; i2 < this.sizeX; i2++) {
                let tile = this.array[i][i2]
                row.push(<GameSquare key={`${i};${i2}`} color={getTileColor(tile)} size={this.sizeX}/>)
            }
            let style : CSSProperties = {
                width: gameSize
            }
            jsxArray.push(
                <div className="flex" style={style}>{row}</div>
            )
        }
        return jsxArray
    }

    getNeighbors(x: number, y: number, direct: boolean = false) : Tile[] {
        let tileArray : Tile[] = []
        const pushIfNotNull = (item?: Tile) => {
            if (!item) return
            tileArray.push(item)
        }
        
        if (!direct) pushIfNotNull(this.getTileAt(x-1,y-1))
        pushIfNotNull(this.getTileAt(x,y-1))
        if (!direct) pushIfNotNull(this.getTileAt(x+1,y-1))

        pushIfNotNull(this.getTileAt(x-1,y))

        pushIfNotNull(this.getTileAt(x+1,y))

        if (!direct) pushIfNotNull(this.getTileAt(x-1,y+1))
        pushIfNotNull(this.getTileAt(x,y+1))
        if (!direct) pushIfNotNull(this.getTileAt(x+1,y+1))
        return tileArray
    }

    getNeighborQuantities(x: number, y: number, direct: boolean = false) : QuantifiableTileset {
        let neighbors = this.getNeighbors(x, y, direct)
        let items : Partial<QuantifiableTileset> = {} 
        for (let neighbor of neighbors) {
            let previousValue = items[neighbor]
            let newValue = (previousValue ?? 0) + 1
            items[neighbor] = newValue
        }
        for (let item of tileTypes) {
            let typedItem = item as unknown as Tile
            items[typedItem] = items[typedItem] ?? 0
        }
        return items as QuantifiableTileset
    }
}

type QuantifiableTileset = {
    [T in Tile]: number
}
