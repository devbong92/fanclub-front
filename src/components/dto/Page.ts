export interface Page {
    pageSize : number;
    currentPage : number;
    totalPages : number;
    totalElements : number;
    offset : number;
    first : boolean;
    last : boolean;
}