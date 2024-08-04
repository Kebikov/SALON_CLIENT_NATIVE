//: MasterAndServiceDTO                               
/** 
 * @table master_and_service
 * @param id_master Id мастера.
 * @param id_service Id услуги.
 */
export interface MasterAndServiceDTO {
    id_master: number;
    id_service: number;
}

//: Types                                             

type TMasterServiceAction = 'push' | 'remove';

/**
 * @param action тип действия.
 */
export interface MasterAndServiceAction extends MasterAndServiceDTO {
    action: TMasterServiceAction;
} 