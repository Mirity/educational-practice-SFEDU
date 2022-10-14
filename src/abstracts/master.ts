export interface MasterFromForm {
    csrf_token: string,
    name: string,
    surname: string,
    head_master_name: string,
    head_master_surname: string,
    service_center: string
}

export interface Master {
    id: number,
    name: string,
    surname: string,
    headMasterName: string,
    headMasterSurname: string,
    serviceCenterName: string
}

export interface DbMaster {
    id: number,
    name: string,
    surname: string,
    head_master_name: string,
    head_master_surname: string,
    service_center_name: string
}