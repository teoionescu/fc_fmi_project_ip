

export class QueryInfo {
    ID:            string
    Common_name:   string
    Specific_name: string
    Details:       Details;
}

export class Details {
    Wikipedia:     string;
}

export class QueryHistory {
    Photo:         string;
    Answer:        QueryInfo;
}

export class HistoryData {
    Data:          QueryHistory[];
}

export class AllClassesInfo {
    Data:          QueryInfo[];
}