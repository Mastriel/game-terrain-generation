


export class Timer {

    private readonly output : (out: string) => void

    private startTime? : Date
    private endTime? : Date
    public readonly label : string

    constructor(label: string, output: (out: string) => void, autoStart: boolean=false) {
        this.label = label
        this.output = output
        if (autoStart) this.start()
    }


    public start() {
        this.startTime = new Date();
    }

    public end() {
        if (this.startTime === undefined) throw new Error("Timer not started.")
        this.endTime = new Date();
        let timeDiff = this.endTime.getMilliseconds() - this.startTime.getMilliseconds()

        this.output(`Time elapsed (${this.label}): ${timeDiff}ms`)
    }
}