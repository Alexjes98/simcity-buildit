export class Service extends Building{
    constructor(name, cover_area, cover_service, capacity, polution_area, is_contaminant){
        this.name = name;
        this.cover_area = cover_area;
        this.cover_service = cover_service;
        this.capacity = capacity;
        this.polution_area = polution_area;
        this.is_contaminant = is_contaminant;
    }
}