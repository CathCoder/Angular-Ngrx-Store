import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Associatemodel } from "../Model/Associatemodel";

const getassociatestate =createFeatureSelector<Associatemodel>('associate');

export const getassociatelist= createSelector(getassociatestate, (state)=>{
    return state.list;
})
export const getassociate = createSelector(getassociatestate, (state) => {
    return state.associateobj;
})