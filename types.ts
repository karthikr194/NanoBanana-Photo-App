
export interface EditedImage {
    imageUrl: string;
    text: string | null;
}

export interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}
