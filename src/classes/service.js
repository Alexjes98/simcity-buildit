import { Building } from './building'
export class Service extends Building{
    constructor(id,type_id,is_active,type,level,effects,name, cover_area, cover_service, capacity, polution_area, is_contaminant,game_values){
        super(id,is_active, type, level, type_id,effects,game_values);
        this.name = name;
        this.cover_area = cover_area;
        this.cover_service = cover_service;
        this.capacity = capacity;
        this.polution_area = polution_area;
        this.is_contaminant = is_contaminant;
    }
}