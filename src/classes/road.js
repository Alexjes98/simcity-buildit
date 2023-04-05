export class Road {
    constructor(type,level, capacity, trafficJams, is_jammed, effects) {
        this.type = type;
        this.level = level;
        this.capacity = capacity;
        this.trafficJams = trafficJams;
        this.is_jammed = is_jammed;
        this.effects = effects;
    }
}