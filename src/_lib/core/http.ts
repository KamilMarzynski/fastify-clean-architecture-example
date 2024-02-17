export type Request = {
    body: any;
    query: any;
    params: any;
    headers: any;
};

export type Response = {
    send: (data: any) => void;
    status: (code: number) => Response;
};