export class Specialties extends Building {
    constructor(id,type_id,name, cover_area, population_bonus, effects){
        super(id,is_active, type, level,type_id);
        this.name = name,
        this.cover_area = cover_area;
        this.population_bonus = population_bonus;
        this.effects = effects;
    }
}