import { Road } from '../classes/road';
import { ResidentialZone } from '../classes/residential-zone';
import { Service } from '../classes/service';

import { __hash__ } from '../utils/utils';
import { Effect } from '../classes/effect';

export function newRoad() {
    return new Road("road", 0, 10, 0, false, []);
}

export function newResidentialZone () {
    const id = __hash__();
    return new ResidentialZone(
        id,"activable_building", false, "residential", 0,
        "home", 20, 2, false, [],
        0.5, 0, true
    )
}

export function newPoliceStation() {
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "police", 0, [],
        "basic_police_station", 3,
        new Effect(__hash__(), 0, id, 'police'),
        7, 0, false
    );
}

export function newFireHouse(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "firehouse", 0, [],
        "basic_firehouse", 5,
        new Effect(__hash__(), 0, id, 'firehouse'),
        10, 0, false
    );
}

export function newHospital(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "health", 0, [],
        "basic_hospital", 4,
        new Effect(__hash__(), 0, id, 'health'),
        15, 0, false
    );
}

export function newResidualWater(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "residual-water", 0, [],
        "basic_residual-water", 4,
        new Effect(__hash__(), 0, id, 'residual-water'),
        30, 3, true
    );
}

export function newTrashPlant(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "cleanliness", 0, [],
        "basic_trash_plant", 4,
        new Effect(__hash__(), 0, id, 'cleanliness'),
        30, 3, true
    );
}

export function newCleanElectricity(){
    const id = __hash__();
    return new Service(
        id, "non_activable_building", true, "electricity", 0, [],
        "basic_turbine", 6,
        new Effect(__hash__(), 0, id, 'electricity'),
        30, 0, false
    );
}

export function newUncleanElectricity(){
    const id = __hash__();
    return new Service(
        id, "activable_building", false, "electricity", 0, [],
        "basic_trash_plant", 4,
        new Effect(__hash__(), 0, id, 'electricity'),
        30, 3, true
    );
}