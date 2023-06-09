import { Road } from '../classes/road';
import { ResidentialZone } from '../classes/residential-zone';
import { Service } from '../classes/service';

import { __hash__ } from '../utils/utils';
import { Effect } from '../classes/effect';
import { Specialtie } from '../classes/specialties';
import { Factory } from '../classes/factory';

export function newRoad() {
    const id = __hash__();
    return new Road(id,"road", 0, 10, 0, false, [],{experience: 1, price: 10});
}

export function newResidentialZone () {
    const id = __hash__();
    return new ResidentialZone(
        id,"activable_building", false, "residential", 0,
        "home", 20, 2, false, [],
        0.0, 0, true, {experience: 10, price: 100}
    );
}

export function newPoliceStation() {
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "police", 0, [],
        "basic_police_station", 3,
        new Effect(__hash__(), 0.1, id, 'police'),
        7, 0, false, {experience: 12, price: 110}
    );
}

export function newFireHouse(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "firehouse", 0, [],
        "basic_firehouse", 5,
        new Effect(__hash__(), 0.1, id, 'firehouse'),
        10, 0, false, {experience: 12, price: 130}
    );
}

export function newHospital(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "health", 0, [],
        "basic_hospital", 4,
        new Effect(__hash__(), 0.1, id, 'health'),
        15, 0, false, {experience: 15, price: 200}
    );
}

export function newResidualWater(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "residual-water", 0, [],
        "basic_residual-water", 4,
        new Effect(__hash__(), 0.1, id, 'residual-water'),
        30, 3, true, {experience: 12, price: 160}
    );
}

export function newTrashPlant(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "cleanliness", 0, [],
        "basic_trash_plant", 4,
        new Effect(__hash__(), 0.1, id, 'cleanliness'),
        30, 3, true, {experience: 10, price: 100}
    );
}

export function newCleanElectricity(){
    const id = __hash__();
    return new Service(
        id, "non_activable_building", true, "electricity", 0, [],
        "basic_turbine", 6,
        new Effect(__hash__(), 0.1, id, 'electricity'),
        30, 0, false, {experience: 20, price: 250}
    );
}

export function newUncleanElectricity(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "electricity", 0, [],
        "basic_trash_plant", 4,
        new Effect(__hash__(), 0.1, id, 'electricity'),
        30, 3, true, {experience: 15, price: 100}
    );
}

export function newPark(){
    const id = __hash__();
    return new Specialtie(id,"non_activable_building",true,"park",0,[],
    "basic_park",4,new Effect(__hash__(), 20, id, 'specialty'), {experience: 10, price: 50}
    );
}

export function newFactory(){
    const id = __hash__();
    return new Factory(id,true,"factory",0,"non_activable_building",[],{experience: 10, price: 100})
}