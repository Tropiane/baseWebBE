interface formInterface {
    formId: number;
    name: string;
    email: string;
    phone: string;
    description: string;
    sendAt: Date;
    comments?: string[]
}

export default formInterface