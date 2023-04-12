import { Building } from './building'
export class Specialtie extends Building {
    constructor(id,type_id,is_active,type,level,effects,name, cover_area,cover_service,game_values){
        super(id,is_active, type, level, type_id,effects,game_values);
        this.name = name;
        this.cover_area = cover_area;
        this.cover_service = cover_service
    }
}