export interface RecordResponse {
    content: Record[],
    totalPages: number,
    number: number
}

export interface Record {
    id: number | undefined,
    service: string,
    customer: string,
    location: string,
    dateTime: string,
    done: boolean,
    canceled: boolean
}

export interface RecordRequest {
    service?: string,
    customer?: string,
    location?: string,
    initialDate?: string,
    finalDate?: string,
    done: boolean,
    canceled: boolean,
    page: number,
    size: number
}