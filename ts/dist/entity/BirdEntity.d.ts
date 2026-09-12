import { FreeBirdsEntityBase } from '../FreeBirdsEntityBase';
import type { FreeBirdsSDK } from '../FreeBirdsSDK';
import type { Control } from '../types';
import type { Bird, BirdLoadMatch, BirdListMatch } from '../FreeBirdsTypes';
declare class BirdEntity extends FreeBirdsEntityBase<Bird> {
    constructor(client: FreeBirdsSDK, entopts: any);
    make(this: BirdEntity): BirdEntity;
    load(this: any, reqmatch?: BirdLoadMatch, ctrl?: Control): Promise<BirdEntity>;
    list(this: any, reqmatch?: BirdListMatch, ctrl?: Control): Promise<BirdEntity[]>;
}
export { BirdEntity };
