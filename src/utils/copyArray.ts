import { UrlType } from "../api/types";

export const copyArray = (array: Array<UrlType>): Array<UrlType> => {
    const copiedArray = array.map((object: UrlType): UrlType => {
        let id = object.id + 18;
        return { ...object, id }    
    });
    const doubledArray: Array<UrlType> = array.concat(copiedArray);

    return doubledArray;
}
