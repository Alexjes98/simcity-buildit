export class Road {
    constructor(name,level, capacity, trafficJams, is_jammed, effects) {
        this.name = name;
        this.level = level;
        this.capacity = capacity;
        this.trafficJams = trafficJams;
        this.is_jammed = is_jammed;
        this.effects = effects;
    }
}